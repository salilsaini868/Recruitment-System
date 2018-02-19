using System;
using System.Collections.Generic;
using System.Text;
using RS.Common.CommonData;
using RS.ViewModel.Approval;
using RS.ViewModel.User;
using RS.Entity.Models;

namespace RS.Service.Interfaces
{
    public interface IApprovalManagerService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="approvalId"></param>
        /// <returns></returns>
        IResult GetApprovalEvents(int approvalId);

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IResult GetAllApprovals();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        IResult GetAllApprovalEventRoles();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="approvalEventRoleViewModel"></param>
        /// <returns></returns>
        IResult ManageApprovalEventRole(ApprovalEventRoleViewModel approvalEventRoleViewModel);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="openingId"></param>
        /// <returns></returns>
        IResult GetApprovalTransactionByEntity(Guid openingId);

        /// <summary>
        /// Update Approval Transaction
        /// </summary>
        /// <param name="approvalTransaction"></param>
        /// <returns></returns>
        IResult UpdateApprovalTransaction(ApprovalTransactionViewModel approvalTransaction);

    }
}
