using System;
namespace projectTracker.Models
{
    public class ProjectStage
    {

        public int ProjectId { get; set; }
        public Project Project { get; set; }

        public int StageId { get; set; }
        public Stage Stage { get; set; }

    }
}
