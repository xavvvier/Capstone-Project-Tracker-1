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
    public class CampusController : Controller {

        // injecting the DbContext object into this controller for use! No more construction needed :)
        private MainDataContext campusManager;
        public CampusController(MainDataContext myManager) {
            campusManager = myManager;
        }

        public IActionResult Index() { 
            return View();
        }

        public IActionResult Add() {
            Campus campus = new Campus(); 
            return View(campus);
        }

        [HttpPost]
        public IActionResult AddSubmit(Campus campus) {
            campusManager.Add(campus);
            campusManager.SaveChanges();
            
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
