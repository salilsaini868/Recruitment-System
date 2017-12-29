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
    [Route("api/Candidate/[Action]")]
    [ValidateModel]
    public class CandidateController : Controller
    {
        private readonly ICandidateManagerService _candidateManager;

        public CandidateController(ICandidateManagerService candidateManager)
        {
            _candidateManager = candidateManager;

        }

        [HttpGet]
        public dynamic GetAllCandidates()
        {
            return null;
        }
    }
}