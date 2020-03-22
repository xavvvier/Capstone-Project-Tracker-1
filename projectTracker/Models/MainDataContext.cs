using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

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

        //Get all Projects ordered by Partner
        public List<Project> getProjects()
        {
           return Project.OrderBy(c => c.Partner)
              .Include(p => p.Category)
              .Include(p => p.Campus)
              .Include(p => p.Status)
              .ToList<Project>();
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
               // .Where (p => p.Status != "Close-out")
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
        //Get a Category by Id
        // public Category CategoryById(int id)
        // {
        //    return Category.FirstOrDefault(c => c.Id == id);
        // }
        //
    }
}
