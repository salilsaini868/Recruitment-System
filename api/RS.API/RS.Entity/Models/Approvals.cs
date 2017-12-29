using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RS.Entity.Models
{
    public partial class Approvals : BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int ApprovalId { get; set; }
        public string ApprovalName { get; set; }
        public string ApprovalDesc { get; set; }

    }
}
