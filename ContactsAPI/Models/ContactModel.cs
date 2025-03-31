using System.ComponentModel.DataAnnotations;

namespace ContactsAPI.Models
{
    public class ContactModel
    {
        [Key]
        public int ContactId { get; set; }

        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }

        [Phone(ErrorMessage = "Invalid phone number")]
        public string Phone { get; set; }

        public string Address { get; set; }
        public string Remarks { get; set; }

        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }

        public DateTime EntryDate { get; set; } = DateTime.Now;
    }
}

