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
using RS.ViewModel.SearchAndSortModel;

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
        public IResult InsertOrUpdateOpening([FromBody]EntityAndApprovalViewModel entityAndApprovalViewModel)
        {
            var createdOpening = _openingManagerService.InsertOrUpdateOpening(entityAndApprovalViewModel);
            return createdOpening;
        }

        [HttpPost]
        public IResult GetOpeningsCorrespondingToLoggedUser([FromBody]SearchAndSortModel searchAndSortModel)
        {
            var openingList = _openingManagerService.GetOpeningsCorrespondingToLoggedUser(searchAndSortModel);
            return openingList;
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