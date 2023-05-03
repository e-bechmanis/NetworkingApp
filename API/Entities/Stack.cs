using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Stack")]

    public class Stack
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public bool CanMentor { get; set; }

        public bool Learning { get; set; }

        public int AppUserId { get; set; }

        public AppUser AppUser { get; set; }
    }
}