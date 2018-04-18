using System.Collections.Generic;
using RS.Entity.Models;
using RS.ViewModel.User;
using System;

using RS.Entity.DTO;

using RS.ViewModel.Approval;


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

        int GetApprovalEventOrderNumber(ApprovalEventViewModel approvalEventViewModel);
        List<Users> GetApprovedUsersByRole(int roleId, int approvalEventId);
        List<Users> GetApprovedUsers(int approvalEventId);
        void CreateApprovalTransaction(ApprovalTransactions approvalTransaction);
        ApprovalTransactions GetApprovalTransactionByEntity(Guid entityId);
        void UpdateApprovalTransaction(ApprovalTransactions approvalTransaction, ApprovalTransactionDetails approvalTransactionDetail);
        void AddApprovalTransactionDetails(ApprovalTransactionDetails approvalTransactionDetails);
        List<ApprovalTransactions> GetAllApprovalTransactions(List<Guid> openingIds);
        int GetApprovalEventOrderOfUser(Guid entityId, Guid userId, int approvalId);


    }
}
