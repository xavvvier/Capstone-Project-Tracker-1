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
    public class StatusController : Controller {

        // injecting the DbContext object into this controller for use! No more construction needed :)
        private MainDataContext statusManager;
        public StatusController(MainDataContext myManager) {
            statusManager = myManager;
        }

        public IActionResult Index() { 
            return View();
        }

        public IActionResult Add() {
            ProjectStatus status = new ProjectStatus(); 
            return View(status);
        }

        [HttpPost]
        public IActionResult AddSubmit(ProjectStatus status) {
            statusManager.Add(status);
            statusManager.SaveChanges();
            
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
