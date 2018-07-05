using Microsoft.AspNetCore.Mvc;
using RS.Common.CommonData;
using RS.ViewModel.User;
using System;
using System.Net;
using RS.Service.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using RS.ViewModel.SearchAndSortModel;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Security.Principal;
using RS.Common.Enums;

namespace RS.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/User/[Action]")]
    [ValidateModel]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IUserManagerService _userService;
        private readonly ClaimsPrincipal _principal;
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _hostingEnvironment;

        public UserController(IPrincipal principal, IUserManagerService userService, IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            _userService = userService;
            _configuration = configuration;
            _hostingEnvironment = hostingEnvironment;
            this._principal = principal as ClaimsPrincipal;
        }

        [HttpGet]
        public IResult GetUserDetails()
        {
            var identity = (ClaimsIdentity)_principal.Identity;
            var userDetails = _userService.GetUserById(new Guid(identity.FindFirst(ClaimTypes.Sid).Value));
            if (userDetails.Body != null)
            {
                userDetails.Body.ProfileImage = GetProfilePicture(userDetails.Body.UserId);
            }
            return userDetails;
        }

        [HttpPost]
        public IResult CreateUser()
        {
            var userViewModel = JsonConvert.DeserializeObject<UserViewModel>(Request.Form["userView"]);
            var file = Request.Form.Files["uploadProfile"];
            var createdUser = _userService.CreateUser(userViewModel);
            if (createdUser.Body != null)
            {
                var allowedExtensions = _configuration["ProfileExtension"].Split(',');
                var docName = createdUser.Body.ToString() + ".png";
                FileHelper.SaveFile(file, docName, allowedExtensions, _hostingEnvironment, "uploadProfiles");
            }
            return createdUser;
        }

        [HttpPut]
        public IResult UpdateUser()
        {
            var userViewModel = JsonConvert.DeserializeObject<UserViewModel>(Request.Form["userView"]);
            var file = Request.Form.Files["uploadProfile"];
            var updatedUser = _userService.UpdateUser(userViewModel);
            if (updatedUser.Body != null && file != null)
            {
                var allowedExtensions = _configuration["ProfileExtension"].Split(',');
                var docName = updatedUser.Body.ToString() + ".png";
                FileHelper.SaveFile(file, docName, allowedExtensions, _hostingEnvironment, "uploadProfiles");
            }
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
            if(userRecord.Body != null)
            {
                userRecord.Body.ProfileImage = GetProfilePicture(id);
            }
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

        private string GetProfilePicture(Guid id)
        {
            var folder = _configuration["uploadProfiles"];
            var path = Path.Combine(_hostingEnvironment.ContentRootPath, folder + id + ".png");
            byte[] data = new byte[100];
            using (WebClient webClient = new WebClient())
            {
               // data = webClient.DownloadData(path);
            }
            return Convert.ToBase64String(data, 0, data.Length);
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