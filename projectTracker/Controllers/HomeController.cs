using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace projectTracker.Controllers
{

    [Authorize]
    public class HomeController : Controller {

        public IActionResult Index() { 
            // add this on top of every action method that needs user authentication
            return View();
        }

        public IActionResult Campus()
        {
            return View();
        }


        public IActionResult Category()
        {
            return View();
        }

        public IActionResult Status()
        {
            return View();
        }

        public IActionResult Projects()
        {
            return View();
        }

        public IActionResult Stages()
        {
            return View();
        }

        public IActionResult Checkpoints()
        {
            return View();
        }
    }
}
