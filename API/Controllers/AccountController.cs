using System.Security.Cryptography;
using System.Text;
using API.data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("register")] //api/account/register

        //API controller will automatically bind Register method with properties of registerDto object
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            // checking if the username for the new user is already taken
            if (await UserExists(registerDto.Username)) return BadRequest("Username already exists");

            // adding 'using' keyword, so that we dispose of this class automatically when we don't need it anymore
            using var hmac = new HMACSHA512();

            // If username is not taken, create a new user
            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
        }
    }
}