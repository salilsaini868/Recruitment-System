using System.Collections.Generic;
using RS.Entity.Models;
using RS.ViewModel.User;
using System;
using RS.Entity.DTO;

namespace RS.Data.Interfaces
{
    public interface IApprovalRepository : IRepository<Approvals>
    {
        List<ApprovalEvents> GetApprovalEvents(int approvalId);
        List<Approvals> GetAllApprovals();
        void AddApprovalEventRole(ApprovalEventRoles approvalEventRole);
        List<ApprovalEventRoles> GetAllApprovalEventRole();
        List<ApprovalTransactionDetails> GetApprovalTransactionDetails();
        Dictionary<string, string> GetApprovalEventsOfUser(Guid UserId);
        List<ApprovalTransactionDetailsDTO> ApprovalTransactionDetails(Guid entityId);
    }
}
