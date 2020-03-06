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
    public class StageController : ControllerBase
    {

        // injecting the DbContext object into this controller for use! No more construction needed :)
        private MainDataContext stageManager;
        public StageController(MainDataContext myManager) {
            stageManager = myManager;
        }

        [HttpGet]
        public IEnumerable<Stage> Index() {
            return stageManager.getStages();
        }

        [HttpPost]
        public async Task<IActionResult> Add(Stage stage)
        {
            try
            {
                stageManager.Add(stage);
                await stageManager.SaveChangesAsync();
                return Ok(stage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(Stage stage) {
            try
            {
                stageManager.Update(stage);
                await stageManager.SaveChangesAsync();
                return Ok(stage);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            //TODO: insert new stage using MainDataContext
            // return BadRequest("Not implemented yet");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var stageItem = await stageManager.Stage.FindAsync(id);
            if (stageItem == null)
            {
                return NotFound("The element does not exist");
            }
            try {
                stageManager.Stage.Remove(stageItem);
                await stageManager.SaveChangesAsync();
                return Ok();
            } 
            catch {
                return BadRequest("The Stage you chose is currently being used in at least one Project and therefore cannot be deleted.");
            }
        }


    }
}
