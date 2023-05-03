using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        // If nullable was enabled, as of .NET6 string values are by default required
        // string? for optional value
        public string UserName { get; set; }

        public byte[] PasswordHash { get; set;}

        public byte[] PasswordSalt { get; set;}

        public int YearsOfExperience { get; set; }

        public string KnownAs { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;

        public DateTime LastActive { get; set; } = DateTime.UtcNow;

        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public List<Stack> Stack { get; set; } = new();

        public string City { get; set; }

        public string Country { get; set; }

        public List<Photo> Photos { get; set; } = new();

    }
}