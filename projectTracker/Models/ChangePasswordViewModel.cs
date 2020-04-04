using System.ComponentModel.DataAnnotations;
using System;

namespace projectTracker.Models
{

   public class ChangePasswordViewModel
   {

      [DataType(DataType.Password)]
      [Required]
      public string Password { get; set; }

      [Required]
      public string NewPassword { get; set; }

      [Required]
      public string NewPasswordConfirmation { get; set; }

   }
}
