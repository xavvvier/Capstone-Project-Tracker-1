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

        public IActionResult Index() { 
            return View();
        }

        public IActionResult Add() { 
            return View("Edit");
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
