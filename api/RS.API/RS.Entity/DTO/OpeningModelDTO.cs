using System;
using System.Collections.Generic;
using System.Text;

namespace RS.Entity.DTO
{
    public class OpeningModelDTO
    {
        public Guid OpeningId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsApproved { get; set; }
        public string PrimarySkills { get; set; }
        public string SecondarySkills { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Status { get; set; }
    }
}
