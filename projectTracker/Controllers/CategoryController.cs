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
            //TODO: get list of categories using MainDataContext
            var categories = new List<Category>{};
            categories = categoryManager.getCategories();
            return categories;
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

        [HttpPut()]
        public async Task<IActionResult> Update(Category category) {
            //TODO: insert new category using MainDataContext
            return BadRequest("Not implemented yet");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var categoryItem = await categoryManager.Category.FindAsync(id);
            if (categoryItem == null)
            {
                return NotFound("The element does not exist");
            }
            categoryManager.Category.Remove(categoryItem);
            await categoryManager.SaveChangesAsync();
            return Ok();
        }


    }
}
