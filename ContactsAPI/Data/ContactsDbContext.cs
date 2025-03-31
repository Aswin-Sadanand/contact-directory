using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Data
{
    public class ContactsDbContext : DbContext
    {
        public ContactsDbContext(DbContextOptions<ContactsDbContext> options) : base(options) { }

        public DbSet<ContactModel> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define primary key explicitly
            modelBuilder.Entity<ContactModel>().HasKey(c => c.ContactId);

            // Seed initial data with corrected spelling and consistent remarks
            modelBuilder.Entity<ContactModel>().HasData(
                new ContactModel { ContactId = 1, FirstName = "Aswin", LastName = "Sadanand", Email = "measwin94@gmail.com", Phone = "1234567890", Address = "123 Main St", Remarks = "Verified", DateOfBirth = DateTime.Parse("1994-05-12") },
                new ContactModel { ContactId = 2, FirstName = "Arya", LastName = "Stark", Email = "aryastark@gmail.com", Phone = "9876543210", Address = "456 Main St", Remarks = "Verified", DateOfBirth = DateTime.Parse("2000-07-09") },
                new ContactModel { ContactId = 3, FirstName = "John", LastName = "Snow", Email = "johnsnow@gmail.com", Phone = "1112223333", Address = "789 Main St", Remarks = "Verified", DateOfBirth = DateTime.Parse("1989-03-15") },
                new ContactModel { ContactId = 4, FirstName = "Tyrian", LastName = "Lannister", Email = "tyrianLannister@gmail.com", Phone = "4445556666", Address = "321 Main St", Remarks = "Verified", DateOfBirth = DateTime.Parse("1978-12-02") },
                new ContactModel { ContactId = 5, FirstName = "Michael", LastName = "Scofield", Email = "scofield@gmail.com", Phone = "7778889999", Address = "654 Main St", Remarks = "Verified", DateOfBirth = DateTime.Parse("1976-10-08") },
                new ContactModel { ContactId = 6, FirstName = "Daenerys", LastName = "Targaryen", Email = "targaryen@gmail.com", Phone = "3332221111", Address = "987 Main St", Remarks = "Verified", DateOfBirth = DateTime.Parse("1991-06-01") },
                new ContactModel { ContactId = 7, FirstName = "Sansa", LastName = "Stark", Email = "sansastark@gmail.com", Phone = "8889990000", Address = "999 Main St", Remarks = "Verified", DateOfBirth = DateTime.Parse("1995-09-13") },
                new ContactModel { ContactId = 8, FirstName = "Jaime", LastName = "Lannister", Email = "jaime@gmail.com", Phone = "6665554444", Address = "025 Main Ave", Remarks = "Verified", DateOfBirth = DateTime.Parse("1980-04-20") },
                new ContactModel { ContactId = 9, FirstName = "Sara", LastName = "Tancredi", Email = "tancredi@gmail.com", Phone = "1113335555", Address = "858 Main St", Remarks = "Verified", DateOfBirth = DateTime.Parse("1982-08-25") },
                new ContactModel { ContactId = 10, FirstName = "Kaniel", LastName = "Outis", Email = "kanieloutis@gmail.com", Phone = "9998887777", Address = "941 Main Rd", Remarks = "Verified", DateOfBirth = DateTime.Parse("1973-11-30") }

            );
        }
    }
}
