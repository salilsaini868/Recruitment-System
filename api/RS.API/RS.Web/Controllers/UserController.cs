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
using RS.ViewModel.SearchAndSortModel;

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
        public IResult GetUserDetails()
        {
            var userDetails = _userService.GetUserDetail();
            return userDetails;
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
        public IResult GetUserById(Guid id)
        {
            var userRecord = _userService.GetUserById(id);
            return userRecord;
        }

        [HttpGet]
        public IResult GetUsersByRole(int id)
        {
            var userRecord = _userService.GetUsersByRole(id);
            return userRecord;
        }

        [HttpPost]
        public IResult GetUsersResults([FromBody]SearchAndSortModel searchAndSortModel)
        {
            var userList = _userService.GetUsersResults(searchAndSortModel);
            return userList;
        }

        [HttpPut]
        public IResult DeleteUser([FromBody]UserViewModel userView)
        {
            if (ModelState.IsValid)
            {
                var deleteUser = _userService.DeleteUser(userView);
                return deleteUser;
            }
            return new Result
            {
                Operation = Operation.Delete,
                Status = Status.Fail,
                Message = CommonErrorMessages.BadRequest,
                Body = null
            };
        }

    }
}