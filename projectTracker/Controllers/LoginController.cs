using System;
using Microsoft.AspNetCore.Mvc;
using projectTracker.Models;
using System.Web;


namespace projectTracker.Controllers {

    public class LoginController : Controller {

        public IActionResult Index() {
            return View();
        } 

[HttpPost]
        public IActionResult Submit(string myUsername, string myPassword) {
            try{

                WebLogin webLogin = new WebLogin("Server=localhost;Database=dotnetcoreSamples;Uid=root;Pwd=;SslMode=none;", HttpContext);
                webLogin.username = myUsername;
                webLogin.password = myPassword;

                // do I have access?
                if (webLogin.unlock()) {
                    //access granted
                    return RedirectToAction("Index","Admin");
                } else {
                    // access denied
                    ViewData["feedback"] = "Incorrect login. Please try again...";
                }
                
                return View("Index");
            } catch (Exception e){
                return Content(e.Message);
            }
            
        }

        public IActionResult Logout() {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");
        } 

    }
}
