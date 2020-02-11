using System;
namespace projectTracker.Models
{
    public class Note
    {
        public int Id { get; set; }
        public String Content { get; set; }
        public DateTime Timestamp { get; set; }
        public int ProjectId { get; set; }
    }
}
