using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using projectTracker.Models;
using System.Linq; 
using System.Threading.Tasks;  
using Microsoft.AspNetCore.Identity;

namespace projectTracker.Controllers
{
    public class LoginController : Controller
    {

        private SignInManager<User> _signManager;

        //Inject the SingInManager
        public LoginController(SignInManager<User> signManager)
        {
            _signManager = signManager;
        }

        [HttpGet]
        //Displays the login form
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        //Validates the user credentials and signs in the user
        public async Task<IActionResult> Index(LoginViewModel login)
        {
           if (ModelState.IsValid) {
              var result = await _signManager.PasswordSignInAsync(login.Username,
                    login.Password, false ,false);

              if (result.Succeeded) {
                 //Login Successful, redirect user to Admin/Create view
                 return RedirectToAction("Index", "Home");
              }
           }
           ViewBag.Message = "Invalid login attempt";
           ModelState.AddModelError("","Invalid login attempt");
           return View(login);
        }

        [HttpGet]
        //Logs out the user and redirect it to the public front page
        public async Task<IActionResult> Bye()
        {
           await _signManager.SignOutAsync();
           return RedirectToAction("Index", "Login");
        }

    }

}
