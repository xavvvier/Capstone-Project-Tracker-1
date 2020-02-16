using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using projectTracker.Models;

namespace projectTracker.Controllers
{

    [Authorize]
    public class CategoryController : Controller {

        // injecting the DbContext object into this controller for use! No more construction needed :)
        private MainDataContext categoryManager;
        public CategoryController(MainDataContext myManager) {
            categoryManager = myManager;
        }

        public IActionResult Index() { 
            return View();
        }

        public IActionResult Add() {
            Category category = new Category(); 
            return View(category);
        }

        [HttpPost]
        public IActionResult AddSubmit(Category category) {
            categoryManager.Add(category);
            categoryManager.SaveChanges();
            
            return RedirectToAction("Index");
        }

        public IActionResult Edit(int id) { 
            return View();
        }

        [HttpPost]
        public IActionResult Edit() { 
            return View();
        }

        [HttpPost]
        public IActionResult Delete() { 
            return View();
        }


    }
}
