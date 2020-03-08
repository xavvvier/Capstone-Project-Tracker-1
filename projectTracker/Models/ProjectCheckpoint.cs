using System;
using System.Collections.Generic;

namespace projectTracker.Models
{
    public class ProjectCheckpoint
    {
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public int CheckpointId { get; set; }
        public Checkpoint Checkpoint { get; set; }
        public bool Completed { get; set; }
        public DateTime DueDate { get; set; }
    }
}
