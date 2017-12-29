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
    [Route("api/Opening/[Action]")]
    [ValidateModel]
    public class OpeningController : Controller
    {
        private readonly IOpeningManagerService _openingManager;

        public OpeningController(IOpeningManagerService openingManager)
        {
            _openingManager = openingManager;

        }

        [HttpGet]
        public dynamic GetAllOpenings()
        {
            return null;
        }
    }
}