using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using projectTracker.Models;
using Microsoft.AspNetCore.Http;
using System.Web;

namespace projectTracker.Controllers
{

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class StatusController : ControllerBase
    {

        // injecting the DbContext object into this controller for use! No more construction needed :)
        private MainDataContext statusManager;
        public StatusController(MainDataContext myManager) {
            statusManager = myManager;
        }

        [HttpGet]
        public IEnumerable<ProjectStatus> Index() {
            return statusManager.getStatuses();
        }

        [HttpPost]
        public async Task<IActionResult> Add(ProjectStatus status)
        {
            try
            {
                statusManager.Add(status);
                await statusManager.SaveChangesAsync();
                return Ok(status);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(ProjectStatus status) {
            try
            {
                statusManager.Update(status);
                await statusManager.SaveChangesAsync();
                return Ok(status);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var statusItem = await statusManager.ProjectStatus.FindAsync(id);
            if (statusItem == null)
            {
                return NotFound("The element does not exist");
            }
            try {
                statusManager.ProjectStatus.Remove(statusItem);
                await statusManager.SaveChangesAsync();
                return Ok();
            } 
            catch {
                return BadRequest("The Status you chose is currently being used in at least one Project and therefore cannot be deleted.");
            }
        }


    }
}
