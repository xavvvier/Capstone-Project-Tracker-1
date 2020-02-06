using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace projectTracker.Models
{
   public class MainDataContext : IdentityDbContext<User> {
      
      public MainDataContext(DbContextOptions<MainDataContext> options)
         : base(options)
      {
      }

      // public DbSet<Link> Link {get; set;}
      // public DbSet<Category> Category {get; set;}
      public DbSet<User> User {get; set;}

      //Get all Categories order by Name including the links associated
      // public IEnumerable<Category> AllCategoriesWithLinks()
      // {
      //    return Category.OrderBy(c => c.Name)
      //       .Include(c => c.Links)
      //       .ToList<Category>();
      // }

      //Get all Categories order by Name 
      // public IEnumerable<Category> AllCategories()
      // {
      //    return Category.OrderBy(c => c.Name)
      //       .ToList<Category>();
      // }


      //Get a Category by Id
      // public Category CategoryById(int id)
      // {
      //    return Category.FirstOrDefault(c => c.Id == id);
      // }
      //
      // //Get a Link by Id
      // public Link LinkById(int id)
      // {
      //    return Link.FirstOrDefault(c => c.Id == id);
      // }
   }
}
