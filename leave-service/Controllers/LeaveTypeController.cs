using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeaveService.Data;
using LeaveService.Models;

namespace LeaveService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveTypesController : ControllerBase
    {
        private readonly LeaveDbContext _context;

        public LeaveTypesController(LeaveDbContext context)
        {
            _context = context;
        }

        // GET: api/leavetypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaveType>>> GetAll()
        {
            return await _context.LeaveTypes.ToListAsync();
        }

        // GET: api/leavetypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LeaveType>> GetById(int id)
        {
            var item = await _context.LeaveTypes.FindAsync(id);
            if (item == null)
                return NotFound();

            return item;
        }

        // POST: api/leavetypes
        [HttpPost]
        public async Task<ActionResult<LeaveType>> Create(LeaveType type)
        {
            _context.LeaveTypes.Add(type);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = type.Id }, type);
        }

        // PUT: api/leavetypes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, LeaveType type)
        {
            if (id != type.Id)
                return BadRequest();

            _context.Entry(type).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/leavetypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.LeaveTypes.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.LeaveTypes.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
