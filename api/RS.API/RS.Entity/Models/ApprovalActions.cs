using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RS.Entity.Models
{
    public partial class ApprovalActions : BaseEntity
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int ApprovalActionId { get; set; }
        public string ApprovalActionName { get; set; }
        public int ApprovalEventId { get; set; }

        public ApprovalEvents ApprovalEvent { get; set; }
    }
}
