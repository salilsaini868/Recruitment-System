using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace RS.Entity.Models
{
    public partial class Openings : BaseEntity
    {
        public Openings()
        {
            OpeningSkills = new HashSet<OpeningSkills>();
        }

        [Key]
        [DefaultValue("newid()")]
        public Guid OpeningId { get; set; }
        public string OpeningDetails { get; set; }
        public string OpeningDescription { get; set; }

        public ICollection<OpeningSkills> OpeningSkills { get; set; }
    }
}
