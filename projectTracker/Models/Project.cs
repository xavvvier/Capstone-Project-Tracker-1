using System;
using System.Collections.Generic;

namespace projectTracker.Models
{
    public class Project
    {

        public int Id { get; set; }
        public String Partner { get; set; }
        public String CurriculumConsultant { get; set; }
        public String Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Decimal Value { get; set; }
        public ProjectStatus Status { get; set; }
        public Category Category { get; set; }
        public Campus Campus { get; set; }
        public ICollection<Note> Notes { get; set; }
        public ICollection<ProjectStage> ProjectStages { get; set; }
    }
}
