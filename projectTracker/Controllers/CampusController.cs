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
    public class CampusController : ControllerBase
    {

        // injecting the DbContext object into this controller for use! No more construction needed :)
        private MainDataContext campusManager;
        public CampusController(MainDataContext myManager) {
            campusManager = myManager;
        }

        [HttpGet]
        public IEnumerable<Campus> Index() {
            return campusManager.getCampuses();
        }

        [HttpPost]
        public async Task<IActionResult> Add(Campus campus)
        {
            try
            {
                campusManager.Add(campus);
                await campusManager.SaveChangesAsync();
                return Ok(campus);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(Campus campus) {
            try
            {
                campusManager.Update(campus);
                await campusManager.SaveChangesAsync();
                return Ok(campus);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            //TODO: insert new campus using MainDataContext
            // return BadRequest("Not implemented yet");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var campusItem = await campusManager.Campus.FindAsync(id);
            if (campusItem == null)
            {
                return NotFound("The element does not exist");
            }
            try {
                campusManager.Campus.Remove(campusItem);
                await campusManager.SaveChangesAsync();
                return Ok();
            } 
            catch {
                return BadRequest("The Campus you chose is currently being used in at least one Project and therefore cannot be deleted.");
            }
        }


    }
}
