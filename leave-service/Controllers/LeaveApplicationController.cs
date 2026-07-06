using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LeaveService.Data;
using LeaveService.Models;

namespace LeaveService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveApplicationsController : ControllerBase
    {
        private readonly LeaveDbContext _context;

        public LeaveApplicationsController(LeaveDbContext context)
        {
            _context = context;
        }

        // GET: api/leaveapplications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeaveApplication>>> GetAll()
        {
            return await _context.LeaveApplications
                .Include(x => x.LeaveType)
                .ToListAsync();
        }

        // GET: api/leaveapplications/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LeaveApplication>> GetById(int id)
        {
            var item = await _context.LeaveApplications
                .Include(x => x.LeaveType)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (item == null)
                return NotFound();

            return item;
        }

        // POST: api/leaveapplications
        [HttpPost]
        public async Task<ActionResult<LeaveApplication>> Create(LeaveApplication app)
        {
            _context.LeaveApplications.Add(app);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = app.Id }, app);
        }

        // PUT: api/leaveapplications/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, LeaveApplication app)
        {
            if (id != app.Id)
                return BadRequest();

            _context.Entry(app).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/leaveapplications/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.LeaveApplications.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.LeaveApplications.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
