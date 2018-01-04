using Microsoft.AspNetCore.Mvc;
using RS.Common.CommonData;
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
        private readonly IUserManagerService _userService;

        public UserController(IUserManagerService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetUserDetails()
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            var details = new
            {
                Name = identity.FindFirst(ClaimTypes.Name).Value,
                Email = identity.FindFirst(ClaimTypes.Email).Value,
                Role = identity.FindFirst(ClaimTypes.Role).Value,
                Sid = identity.FindFirst(ClaimTypes.Sid).Value
            };
            return new ObjectResult(details);
        }

        [HttpPost]
        public IResult CreateUser([FromBody]UserViewModel userView)
        {
            var createdUser = _userService.CreateUser(userView);
            return createdUser;
        }

        [HttpPut]
        public IResult UpdateUser([FromBody]UserViewModel userView)
        {
            var updatedUser = _userService.UpdateUser(userView);
            return updatedUser;
        }

        [HttpGet]
        public IResult GetAllUser()
        {
            var userList = _userService.GetAllUser();
            return userList;
        }

        [HttpGet]
        public IResult GetUserById(int id)
        {
            var userRecord = _userService.GetUserById(id);
            return userRecord;
        }

    }
}