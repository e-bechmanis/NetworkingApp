using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using AutoMapper;
using API.DTOs;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        // Endpoints should always have Http method to make a request
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            // Entity Framework is supposed to track the user info as of this point
            var user = await _userRepository.GetUserByUsernameAsync(username);

            if(user == null) return NotFound();

            // Overwriting properties of user with the data passed in memberUpdateDto
            _mapper.Map(memberUpdateDto, user);

            // It is recommended to return NoContent() from Http PUT request
            // Actual return code will be 204
            if(await _userRepository.SaveAllAsync()) return NoContent();

            // If this line is reached, then nothing has been saved in the database
            return BadRequest("Failed to update user");
        }

    }
}