using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RS.Entity.Models
{
    public partial class Roles
    {
        public Roles()
        {
            ApprovalEventRoles = new HashSet<ApprovalEventRoles>();
        }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int RoleId { get; set; }
        public string RoleName { get; set; }

        public ICollection<ApprovalEventRoles> ApprovalEventRoles { get; set; }
    }
}
