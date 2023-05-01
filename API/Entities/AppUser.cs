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

    }
}