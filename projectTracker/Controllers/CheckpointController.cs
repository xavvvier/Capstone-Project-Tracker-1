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
    public class CheckpointController : ControllerBase
    {

        // injecting the DbContext object into this controller for use! No more construction needed :)
        private MainDataContext checkpointManager;
        public CheckpointController(MainDataContext myManager) {
            checkpointManager = myManager;
        }

        [HttpGet]
        public IEnumerable<Checkpoint> Index() {
            return checkpointManager.getCheckpoints();
        }

        [HttpPost]
        public async Task<IActionResult> Add(Checkpoint checkpoint)
        {
            try
            {
                checkpointManager.Add(checkpoint);
                await checkpointManager.SaveChangesAsync();
                return Ok(checkpoint);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(Checkpoint checkpoint) {
            try
            {
                checkpointManager.Update(checkpoint);
                await checkpointManager.SaveChangesAsync();
                return Ok(checkpoint);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            //TODO: insert new checkpoint using MainDataContext
            // return BadRequest("Not implemented yet");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var checkpointItem = await checkpointManager.Checkpoint.FindAsync(id);
            if (checkpointItem == null)
            {
                return NotFound("The element does not exist");
            }
            try {
                checkpointManager.Checkpoint.Remove(checkpointItem);
                await checkpointManager.SaveChangesAsync();
                return Ok();
            } 
            catch {
                return BadRequest("The Checkpoint you chose is currently being used in at least one Project and therefore cannot be deleted.");
            }
        }


    }
}
