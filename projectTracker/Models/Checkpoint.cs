using System;
namespace projectTracker.Models
{
    public class Checkpoint
    {
        public int Id { get; set; }
        public String Description { get; set; }
        public int StageId { get; set; }        
        public Stage Stage { get; set; }
    }
}
