using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using projectTracker.Models;

namespace projectTracker.Controllers
{

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NoteController : ControllerBase
    {

        // injecting the DbContext object into this controller for use! No more construction needed :)
        private MainDataContext noteManager;
        public NoteController(MainDataContext myManager) {
            noteManager = myManager;
        }

        [HttpPost]
        public async Task<IActionResult> Add(Note note)
        {
            try
            {
                noteManager.Add(note);
                await noteManager.SaveChangesAsync();
                noteManager.updateProjectTime(note.ProjectId);
                return Ok(note);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var noteItem = await noteManager.Note.FindAsync(id);
            if (noteItem == null)
            {
                return NotFound("The element does not exist");
            }
            try {
                noteManager.Note.Remove(noteItem);
                await noteManager.SaveChangesAsync();
                noteManager.updateProjectTime(noteItem.ProjectId);
                return Ok();
            } 
            catch {
                return BadRequest("The Note you chose is currently being used in at least one Project and therefore cannot be deleted.");
            }
        }


    }
}
