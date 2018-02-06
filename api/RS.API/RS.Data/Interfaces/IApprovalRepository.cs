using System.Collections.Generic;
using RS.Entity.Models;
using RS.ViewModel.User;

namespace RS.Data.Interfaces
{
    public interface IApprovalRepository : IRepository<Approvals>
    {
        List<ApprovalEvents> GetApprovalEvents(int approvalId);
        List<ApprovalEvents> GetAllApprovalEvents();
        void ManageApprovalEventRole(ApprovalEventRoles approvalEventRole);
        void UpdateUserEventRole(List<ApprovalEventRoles> approvalEventRoles);
        List<ApprovalEventRoles> GetAllApprovalEventRole();
    }
}
