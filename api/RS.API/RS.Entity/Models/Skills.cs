using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RS.Entity.Models
{
    public partial class Skills
    {
        public Skills()
        {
            CandidateSkills = new HashSet<CandidateSkills>();
            OpeningSkills = new HashSet<OpeningSkills>();
        }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int SkillId { get; set; }
        public string SkillName { get; set; }
        public string SkillDescription { get; set; }
       

        public ICollection<CandidateSkills> CandidateSkills { get; set; }
        public ICollection<OpeningSkills> OpeningSkills { get; set; }
    }
}
