using System;
using System.Collections.Generic;

namespace projectTracker.Models
{
    public class Stage
    {
        public int Id { get; set; }
        public String Title { get; set; }
        public String Description { get; set; }
        public ICollection<Checkpoint> Checkpoints { get; set; }
        public ICollection<ProjectStage> ProjectStages { get; set; }

    }
}
