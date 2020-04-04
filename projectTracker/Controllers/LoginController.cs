using System;
using Microsoft.AspNetCore.Mvc;
using projectTracker.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace projectTracker.Controllers
{
    public class LoginController : Controller
    {

        private SignInManager<User> _signManager;
        private UserManager<User> _userManager;

        //Inject the SingInManager
        public LoginController(SignInManager<User> signManager, UserManager<User> userManager)
        {
            _signManager = signManager;
            _userManager = userManager;
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
                    login.Password, true ,false);

              if (result.Succeeded) {
                 //Login Successful, redirect user to Admin/Create view
                 return RedirectToAction("Index", "Home");
              }
           }
           ViewBag.Message = "Invalid login attempt";
           ModelState.AddModelError("","Invalid login attempt");
           return View(login);
        }

        [HttpGet()]
        public IActionResult Reset()
        {
           ViewBag.Error = false;
           return View();
        }

        [HttpPost("reset")]
        [Authorize]
        public async Task<IActionResult> Reset(ChangePasswordViewModel model)
        {
           ViewBag.Error = true;
           if(model.NewPassword != model.NewPasswordConfirmation) {
              ModelState.AddModelError("","The new password doesn't match the password confirmation.");
              return View("Reset");
           }
           var user = await _userManager.GetUserAsync(User);
           var changeResult = await _userManager.ChangePasswordAsync(user, model.Password, model.NewPassword);
           if(changeResult.Succeeded) {
              ViewBag.Message = "Password changed successfully";
              ViewBag.Error = false;
           } else {
              String message = "Invalid current password";
              foreach(var error in changeResult.Errors)
              {
                message = error.Description;
                break;
              }
              ModelState.AddModelError("", message);
           }
           return View("Reset");
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
