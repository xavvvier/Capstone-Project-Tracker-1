﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using projectTracker.Models;
using System.Linq;
using System.Text;

namespace projectTracker.Controllers
{

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {

        // injecting the DbContext object into this controller for use! No more construction needed :)
        private MainDataContext projectManager;
        public ProjectController(MainDataContext myManager) {
            projectManager = myManager;
        }

        [HttpGet]
        public IEnumerable<Project> Index(string sort, int asc, string filter) {
            return projectManager.getProjects(sort, asc, filter);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Project project)
        {
            try
            {
                projectManager.Add(project);
                var checkpoints = projectManager.Checkpoint.ToList<Checkpoint>();
                var listOfProjectCheckPoint  = checkpoints.Select(c => new ProjectCheckpoint{
                    Checkpoint = c,
                }).ToList();
                project.Checkpoints = listOfProjectCheckPoint;
                await projectManager.SaveChangesAsync();

                return Ok(project);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(Project project) {
            try
            {
                projectManager.Update(project);
                await projectManager.SaveChangesAsync();
                return Ok(project);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            //TODO: insert new project using MainDataContext
            // return BadRequest("Not implemented yet");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) {
            var projectItem = await projectManager.Project.FindAsync(id);
            if (projectItem == null)
            {
                return NotFound("The element does not exist");
            }
            projectManager.Project.Remove(projectItem);
            await projectManager.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("{id}")]
        public Project Project(int id) {
            return projectManager.getProject(id);
        }

        [HttpGet("bycampus/{id}")]
        public IEnumerable<Project> FilterProjects(int id) {
            return projectManager.getFilteredProjects(id);
        }

        // [HttpGet("{column}{asc}{filter")]
        // public IEnumerable<Project> FilterAndSortedProjects() {
        //     return projectManager.getFilteredAndSortedProjects(string column, int asc, string filter);
        // }


        [HttpPut("markcheckpoint")]
        public async Task<IActionResult> UpdateProjectCheckpointCompleted(ProjectCheckpoint cp) {
            try
            {
                projectManager.Attach(cp);
                projectManager.Entry(cp).Property("Completed").IsModified = true;
                await projectManager.SaveChangesAsync();
                return Ok(cp);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("markduedate")]
        public async Task<IActionResult> UpdateProjectCheckpointDueDate(ProjectCheckpoint cp) {
            try
            {
                projectManager.Attach(cp);
                projectManager.Entry(cp).Property("DueDate").IsModified = true;
                await projectManager.SaveChangesAsync();
                return Ok(cp);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("export")]
        public FileResult Export() {

            List<object> projects = projectManager.getExportProjects();
    
            //Insert the Column Names.
            projects.Insert(0, new string[7] { "Partner", "Curiculum Consultant", "Description", "Start Date", "End Date", "Project Value", "Total Time Spent" });
    
            StringBuilder projectString = projectManager.buildProjectString(projects);
    
            return File(Encoding.UTF8.GetBytes(projectString.ToString()), "text/csv", "Projects.csv");
        }


    }
}
