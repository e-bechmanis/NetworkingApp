using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        //Both username and password props are required for registration
        //Validation on RegisterDTO level
        [Required]
        public string Username {get; set;}
        
        [Required]
        public string Password {get; set;}
    }
}