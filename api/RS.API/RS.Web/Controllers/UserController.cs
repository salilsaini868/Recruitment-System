using Microsoft.AspNetCore.Mvc;
using RS.Common.CommonData;
using RS.Common.Enums;
using RS.ViewModel.User;
using System;
using System.Net;
using System.Net.Http;
using RS.Service.Interfaces;
using static RS.ViewModel.User.LoginModel;

namespace RS.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/User/[Action]")]
    [ValidateModel]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpPost]
        public UserViewModel UserLogin([FromBody]UserLoginModel LoginModel)
        {
            UserViewModel user = _userService.LoginUser(LoginModel.UserEmail, LoginModel.UserPassword);
            return user;
        }

    }
}