using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace RS.Entity.Models
{
    public partial class Candidate : BaseEntity
    {
        public Candidate()
        {
            CandidateDocuments = new HashSet<CandidateDocuments>();
            CandidateSkills = new HashSet<CandidateSkills>();
        }

        [Key]
        [DefaultValue("newid()")]
        public Guid CandidateId { get; set; }
        public int CandidateGender { get; set; }
        public string CandidateFirstName { get; set; }
        public string CandidateLastName { get; set; }
        public int CandidateExperienceYear { get; set; }
        public int CandidateExperienceMonth { get; set; }
        public int CandidateQualificationId { get; set; }
        public string CandidateOrganisation { get; set; }
        public string CandidateDesc { get; set; }

        public Qualifications CandidateQualification { get; set; }
        public ICollection<CandidateDocuments> CandidateDocuments { get; set; }
        public ICollection<CandidateSkills> CandidateSkills { get; set; }
    }
}
