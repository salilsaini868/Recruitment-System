using Microsoft.AspNetCore.Mvc;
using RS.Common.CommonData;
using RS.Common.Extensions;
using RS.Common.Enums;
using RS.ViewModel.User;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using RS.Service.Interfaces;
using static RS.ViewModel.User.LoginModel;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace RS.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/User/[Action]")]
    [ValidateModel]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetUserDetails()
        {
            var identity = (ClaimsIdentity)User.Identity;
            var details = GenericHelper.GetUserClaimDetails(identity);
            return new ObjectResult(details);
        }

    }
}