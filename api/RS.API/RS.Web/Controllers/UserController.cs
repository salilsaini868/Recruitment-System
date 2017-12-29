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

        /// <summary>
        /// Save new User
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage UserCreate([FromBody]UserModel model)
        {
            StatusEnum.Status status = _userService.SaveUser(model);
            var resp = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(string.Format(UserAccountNotification.UserCreated)),
                ReasonPhrase = UserAccountNotification.UserCreated,
            };
            return resp;
        }


        [HttpPost]
        public dynamic UserLogin([FromBody]UserLoginModel LoginModel)
        {
            dynamic status = _userService.LoginUser(LoginModel.UserEmail, LoginModel.UserPassword);
            return status;
        }

        ///// <summary>
        ///// Update the user records
        ///// </summary>
        ///// <param name="model"></param>
        ///// <returns></returns>
        [HttpPost]
        public HttpResponseMessage UpdateUser([FromBody]UserModel model)
        {

            StatusEnum.Status status = _userService.UpdateUser(model);

            var resp = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(string.Format(UserAccountNotification.UserCreated)),
                ReasonPhrase = UserAccountNotification.UserCreated,
            };
            return resp;
        }

        [HttpGet]
        public dynamic GetAllUser()
        {
            var userlist = _userService.GetAllUser();
            return userlist;
        }

        [HttpGet]
        public dynamic GetUserByID(Guid id)
        {
            dynamic entity = _userService.GetUser(id);
            return entity;
        }

        [HttpGet]
        public HttpResponseMessage DeleteUser(Guid roleid)
        {
            StatusEnum.Status status = _userService.DeleteUser(roleid);

            var resp = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(string.Format(UserAccountNotification.UserDeleted)),
                ReasonPhrase = UserAccountNotification.UserDeleted,
            };
            return resp;
        }

    }
}