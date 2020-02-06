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
    public class HomeController : Controller {

        public IActionResult Index() { 
            // add this on top of every action method that needs user authentication
            return View();
        }


    }
}
