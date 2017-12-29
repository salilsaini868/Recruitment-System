using Microsoft.AspNetCore.Mvc;
using RS.Common.CommonData;
using RS.Common.Enums;
using RS.ViewModel.Roles;
using RS.Service.Interfaces;
using System;
using System.Net;
using System.Net.Http;

namespace RS.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Approval/[Action]")]
    [ValidateModel]
    public class ApprovalController : Controller
    {
        private readonly IApprovalManagerService _approvalManager;

        public ApprovalController(IApprovalManagerService approvalManager)
        {
            _approvalManager = approvalManager;

        }

        [HttpGet]
        public dynamic GetAllApprovals()
        {
            return null;
        }
    }
}