using System;
using System.Collections.Generic;
using System.Text;

namespace RS.ViewModel.Approval
{
    public class ApprovalTransactionViewModel
    {
        public int ApprovalTransactionId { get; set; }
        public int ApprovalId { get; set; }
        public int ApprovalEventOrder { get; set; }
        public int EventOrderNumber { get; set; }
        public int NextEventOrderNumber { get; set; }
        public int ApprovalActionId { get; set; }
        public Guid EntityId { get; set; }
        public int EntityType { get; set; }
        public string Comment { get; set; }
        public List<ApprovalActionViewModel> ApprovalActions { get; set; }
    }
}
