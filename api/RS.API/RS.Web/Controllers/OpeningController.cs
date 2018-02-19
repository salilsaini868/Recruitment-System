using Microsoft.AspNetCore.Mvc;
using RS.Common.CommonData;
using RS.Common.Enums;
using RS.ViewModel.Roles;
using RS.Service.Interfaces;
using System;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using RS.ViewModel.Opening;
using RS.ViewModel.Approval;

namespace RS.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Opening/[Action]")]
    [Authorize]
    public class OpeningController : Controller
    {
        private readonly IOpeningManagerService _openingManagerService;

        public OpeningController(IOpeningManagerService openingManagerService)
        {
            _openingManagerService = openingManagerService;

        }

        [ValidateModel]
        [HttpPost]
        public IResult CreateOpening([FromBody]OpeningAndApprovalViewModel openingAndApprovalViewModel)
        {
            var createdOpening = _openingManagerService.CreateOpening(openingAndApprovalViewModel.openingViewModel, openingAndApprovalViewModel.approvalTransactionViewModel);
            return createdOpening;
        }

        [ValidateModel]
        [HttpPut]
        public IResult UpdateOpening([FromBody]OpeningAndApprovalViewModel openingAndApprovalViewModel)
        {
            var updatedOpening = _openingManagerService.UpdateOpening(openingAndApprovalViewModel.openingViewModel, openingAndApprovalViewModel.approvalTransactionViewModel);
            return updatedOpening;
        }

        [HttpGet]
        public IResult GetAllOpening()
        {
            var openingList = _openingManagerService.GetAllOpenings();
            return openingList;
        }

        [HttpGet]
        public IResult GetOpeningById(Guid id)
        {
            var openingRecord = _openingManagerService.GetOpeningById(id);
            return openingRecord;
        }
    }
}