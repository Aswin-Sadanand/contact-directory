using ContactsAPI.Data;
using ContactsAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Controllers
{
    [Route("api/contacts")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ContactsDbContext _context;

        public ContactController(ContactsDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactModel>>> GetContactsList()
        {
            return await _context.Contacts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactModel>> GetContactDetails(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound("The requested contact was not found.");
            }
            return contact;
        }

        [HttpPost]
        public async Task<ActionResult<ContactModel>> CreateContact(ContactModel contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetContactDetails), new { id = contact.ContactId }, contact);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, ContactModel contact)
        {
            if (id != contact.ContactId)
            {
                return BadRequest("Contact ID mismatch.");
            }

            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Contacts.Any(c => c.ContactId == id))
                {
                    return NotFound("The contact not found.");
                }
                else
                {
                    throw;
                }
            }

            return Ok("Contact updated successfully.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound("The contact not found.");
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();


            return Ok("Contact deleted successfully.");
        }
    }
}
