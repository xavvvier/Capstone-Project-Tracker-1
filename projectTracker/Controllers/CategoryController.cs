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
    public class CategoryController : ControllerBase
    {

        // injecting the DbContext object into this controller for use! No more construction needed :)
        private MainDataContext categoryManager;
        public CategoryController(MainDataContext myManager) {
            categoryManager = myManager;
        }

        [HttpGet]
        public IEnumerable<Category> Index() {
            return categoryManager.getCategories();
        }

        [HttpPost]
        public async Task<IActionResult> Add(Category category)
        {
           try
             {
                categoryManager.Add(category);
                await categoryManager.SaveChangesAsync();
                return Ok(category);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }     
           
        }

        [HttpPut]
        public async Task<IActionResult> Update(Category category) {
           try
             {
                categoryManager.Update(category);
                await categoryManager.SaveChangesAsync();
                return Ok(category);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }    
           
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var categoryItem = await categoryManager.Category.FindAsync(id);
            if (categoryItem == null)
            {
                return NotFound("The element does not exist");
            }
            try {
                categoryManager.Category.Remove(categoryItem);
                await categoryManager.SaveChangesAsync();
                return Ok();
            } 
            catch {
                return BadRequest("The Category you chose is currently being used in at least one Project and therefore cannot be deleted.");
            }
        }


    }
}
