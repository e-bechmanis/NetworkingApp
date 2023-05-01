using Microsoft.AspNetCore.Mvc;
using API.data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        // conventional to use _ for private variables in c#
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        // This route will be accessible to all users
        [AllowAnonymous]
        // Endpoints should always have Http method to make a request
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }

    }
}