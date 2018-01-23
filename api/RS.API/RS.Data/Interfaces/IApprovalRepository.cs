using System.Collections.Generic;
using RS.Entity.Models;

namespace RS.Data.Interfaces
{
    public interface IApprovalRepository : IRepository<Approvals>
    {
        List<ApprovalEvents> GetApprovalEvents(int approvalId);
    }
}
