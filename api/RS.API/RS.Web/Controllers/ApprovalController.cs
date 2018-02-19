using Microsoft.AspNetCore.Mvc;
using RS.Common.CommonData;
using RS.Common.Enums;
using RS.ViewModel.Roles;
using RS.Service.Interfaces;
using System;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using RS.ViewModel.Approval;

namespace RS.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Approval/[Action]")]
    [Authorize]
    public class ApprovalController : Controller
    {
        private readonly IApprovalManagerService _approvalManager;

        public ApprovalController(IApprovalManagerService approvalManager)
        {
            _approvalManager = approvalManager;

        }

        /// <summary>
        /// Get approval events by approval Id
        /// </summary>
        /// <param name="approvalId"></param>
        /// <returns></returns>
        [HttpGet]
        public IResult GetApprovalEvents(int approvalId)
        {
            return _approvalManager.GetApprovalEvents(approvalId);
        }

        [HttpGet]
        public IResult GetApprovals()
        {
            return _approvalManager.GetAllApprovals();
        }

        [HttpGet]
        public IResult GetAllApprovalEventRoles()
        {
            return _approvalManager.GetAllApprovalEventRoles();
        }

        [HttpGet]
        public IResult GetApprovalTransactionByEntity(Guid openingId)
        {
            return _approvalManager.GetApprovalTransactionByEntity(openingId);
        }

        [ValidateModel]
        [HttpPost]
        public IResult createEventRole([FromBody]ApprovalEventRoleViewModel approvalEventRoleViewModel)
        {
            var createdEventRole = _approvalManager.ManageApprovalEventRole(approvalEventRoleViewModel);
            return createdEventRole;
        }

        [ValidateModel]
        [HttpPut]
        public IResult updateApprovalTransaction([FromBody]ApprovalTransactionViewModel approvalTransactionViewModel)
        {
            var createdEventRole = _approvalManager.UpdateApprovalTransaction(approvalTransactionViewModel);
            return createdEventRole;
        }
    }
}