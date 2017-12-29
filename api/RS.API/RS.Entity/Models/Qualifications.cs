using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RS.Entity.Models
{
    public partial class Qualifications
    {
        public Qualifications()
        {
            Candidate = new HashSet<Candidate>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int QualificationId { get; set; }
        public string QualificationName { get; set; }
        public string QualificationDesc { get; set; }

        public ICollection<Candidate> Candidate { get; set; }
    }
}
