using System;
using System.Collections.Generic;
using System.Text;
using RS.Common.CommonData;
using RS.ViewModel.Approval;
using RS.ViewModel.User;

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
        IResult GetAllApprovalEvents();

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

    }
}
