using System.ComponentModel.DataAnnotations;
using System;

namespace projectTracker.Models
{

   public class LoginViewModel
   {

      [Required]
      public string Username { get; set; }

      [DataType(DataType.Password)]
      [Required]
      public string Password { get; set; }

   }
}
