using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace projectTracker.Models
{
    public class MainDataContext : IdentityDbContext<User>
    {

        public MainDataContext(DbContextOptions<MainDataContext> options)
           : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ProjectCheckpoint>()
                .HasKey(pc => new { pc.ProjectId, pc.CheckpointId });
            modelBuilder.Entity<ProjectCheckpoint>()
                .HasOne(pc => pc.Project)
                .WithMany(p => p.Checkpoints)
                .HasForeignKey(p => p.ProjectId);
            // modelBuilder.Entity<ProjectCheckpoint>()
            //     .HasOne(pc => pc.Checkpoint)
            //     .WithMany(c => c.Checkpoints)
            //     .HasForeignKey(s => s.CheckpointId);
        }

        public DbSet<User> User { get; set; }
        public DbSet<Campus> Campus { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<ProjectStatus> ProjectStatus { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<Checkpoint> Checkpoint { get; set; }
        public DbSet<Note> Note { get; set; }
        public DbSet<Stage> Stage { get; set; }

        //Get all Campuses ordered by Name 
        public List<Campus> getCampuses()
        {
           return Campus.OrderBy(c => c.Name)
              .ToList<Campus>();
        }

        //Get all Categories ordered by Name 
        public List<Category> getCategories()
        {
           return Category.OrderBy(c => c.Name)
              .ToList<Category>();
        }

        //Get all Statuses ordered by Name 
        public List<ProjectStatus> getStatuses()
        {
           return ProjectStatus.OrderBy(c => c.Name)
              .ToList<ProjectStatus>();
        }

        //Get all Projects ordered by Partner or sorted and filtered by column
        public List<Project> getProjects(string column, int order, string filter)
        {
            IQueryable<Project> query = Project
               .Include(p => p.Category)
               .Include(p => p.Campus)
               .Include(p => p.Status);

         	switch (column) {
               case "campus":
                  if (order == 1) {
                     query = query.OrderBy(c => c.Campus.Name);
                  } else {
                     query = query.OrderByDescending(c => c.Campus.Name);
                  }
                  break;

               case "category":
                  if (order == 1) {
                     query = query.OrderBy(c => c.Category.Name);
                  } else {
                     query = query.OrderByDescending(c => c.Category.Name);
                  }
                  break;

               case "partner":
                  if (order == 1) {
                     query = query.OrderBy(c => c.Partner);
                  } else {
                     query = query.OrderByDescending(c => c.Partner);
                  }
                  break;

               case "description":
                  if (order == 1) {
                     query = query.OrderBy(c => c.Description);
                  } else {
                     query = query.OrderByDescending(c => c.Description);
                  }
                  break;

               case "curriculum":
                  if (order == 1) {
                     query = query.OrderBy(c => c.CurriculumConsultant);
                  } else {
                     query = query.OrderByDescending(c => c.CurriculumConsultant);
                  }
                  break;

               case "startdate":
                  if (order == 1) {
                     query = query.OrderBy(c => c.StartDate);
                  } else {
                     query = query.OrderByDescending(c => c.StartDate);
                  }
                  break;

               case "enddate":
                  if (order == 1) {
                     query = query.OrderBy(c => c.EndDate);
                  } else {
                     query = query.OrderByDescending(c => c.EndDate);
                  }
                  break;

               case "value":
                  if (order == 1) {
                     query = query.OrderBy(c => c.Value);
                  } else {
                     query = query.OrderByDescending(c => c.Value);
                  }
                  break;

               case "status":
                  if (order == 1) {
                     query = query.OrderBy(c => c.Status.Name);
                  } else {
                     query = query.OrderByDescending(c => c.Status.Name);
                  }
                  break;

               default:

                  query = query.OrderBy(c => c.Partner);
                  break;
            }

            if (!string.IsNullOrEmpty(filter)) {
               query = query.Where(p => p.Partner.ToLower().Contains(filter.ToLower())|| p.Description.ToLower().Contains(filter.ToLower()));

            }
            return query.ToList();
        }

        //Get Project data for exporting to CSV 
        public List<object> getExportProjects() {
            List<object> projects = (from project in Project.ToList()
                                    select new[] { project.Partner.ToString(),
                                                   project.CurriculumConsultant,
                                                   project.Description,
                                                   project.StartDate.ToString(),
                                                   project.EndDate.ToString(),
                                                   project.Value.ToString(),
                                                   project.TotalTime.ToString()
                                    }).ToList<object>();
            return projects;
        }

        //Create String for export to CSV
        public StringBuilder buildProjectString(List<object> projects) {

            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < projects.Count; i++) {
                string[] project = (string[])projects[i];
                for (int j = 0; j < project.Length; j++) {
                  string changeDoubleQuotes = project[j].Replace("\"", "'");
                  if (changeDoubleQuotes.Contains(",")) {
                     sb.Append(string.Format("\"{0}\",", changeDoubleQuotes));
                  } else {
                     //Append data with separator.
                     sb.Append(string.Format("{0},", changeDoubleQuotes));
                  }
                }
    
                //Append new line character.
                sb.Append("\r\n");    
            }
            return sb;
        }

        //Get Project by Id
        public Project getProject(int id)
        {
           var project = Project.Where(c => c.Id == id)
              .Include(p => p.Notes)
              .Include(p => p.Checkpoints)
              .ThenInclude(pc => pc.Checkpoint)
              .ThenInclude(c => c.Stage)
              .First();
            project.Checkpoints = project.Checkpoints.OrderByDescending(c => c.Checkpoint.Stage.Description)
                                    .ThenBy(c => c.Checkpoint.Description)
                                    .ToList();
            return project;
        }

        //Get Projects filtered by CampusId
        public IEnumerable<Project> getFilteredProjects(int id)
        {
           var projects = Project.Where(p => p.CampusId == id && p.Status.Name != "Close-out") 
               .Include(p => p.Notes)
               .Include(p => p.Category)
               .Include(p => p.Status)
               .Include(p => p.Checkpoints)
               .ThenInclude(pc => pc.Checkpoint)
               .ThenInclude(c => c.Stage)
               .ToList();
               foreach (var project in projects)
               {
                   
                  project.Checkpoints = project.Checkpoints.OrderByDescending(c => c.Checkpoint.Stage.Description)
                                    .ThenBy(c => c.Checkpoint.Description).ToList();
                  project.Notes = project.Notes.OrderByDescending(n => n.Timestamp).ToList();
               }
            return projects;
        }

        //Get all Stages ordered by Title 
        public List<Stage> getStages()
        {
           return Stage.OrderBy(c => c.Title)
              .ToList<Stage>();
        }

        //Get all Checkpoints ordered by Description 
        public List<Checkpoint> getCheckpoints()
        {
           return Checkpoint.OrderBy(c => c.Description)
               .Include(c => c.Stage)            
               .ToList<Checkpoint>();
        }

      //   //Get Checkpoint Id's for deletion
      //   public List<Checkpoint> getCheckpointsForDeletion(int id)
      //   {
      //      var ids = ProjectCheckpoint.ProjectId (c => c.ProjectId == id).ToList();
      //      return Checkpoint
      //   }

         public int updateProjectTime(int id) {
            int TotalTime = Note.Where(c => c.ProjectId == id)
            .Sum(c => c.Minutes);

            Project myProject = new Project();
            myProject.Id = id;
            Project.Attach(myProject);
            myProject.TotalTime = TotalTime;
            SaveChanges();
            return TotalTime;
         }

         public List<Note> getNotes(int id) {
            return Note.Where(n => n.ProjectId == id)
                       .OrderByDescending(n => n.Timestamp)
                       .ToList();
         }
    }
}
