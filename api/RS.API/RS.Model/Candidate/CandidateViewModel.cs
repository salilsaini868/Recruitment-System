using System;
using System.Collections.Generic;
using System.Text;

namespace RS.ViewModel.Candidate
{
    public class CandidateViewModel
    {
        public Guid CandidateId { get; set; }
        public int Gender { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int ExperienceYear { get; set; }
        public int ExperienceMonth { get; set; }
        public string Description { get; set; }
        public string Organization { get; set; }
        public int Qualification { get; set; }
        public string QualificationName { get; set; }
        public Guid Opening { get; set; }
        public string OpeningTitle { get; set; }
    }
}
