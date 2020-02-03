using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using projectTracker.Models;

namespace projectTracker.Controllers
{
    public class AdminController : Controller {

        // injecting the DbContext object into this controller for use! No more construction needed :)
        private ProjectManager projectManager;
        public AdminController(ProjectManager myManager) {
            projectManager = myManager;
        }

        public IActionResult Index() { 
            // add this on top of every action method that needs user authentication
            if (HttpContext.Session.GetString("auth") != "true") {
                return RedirectToAction("Index", "Login");
            } 
            return View(projectManager);
        }


    }
}
