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
using Newtonsoft.Json;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace RS.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/User/[Action]")]
    [ValidateModel]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IUserManagerService _userService;
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _hostingEnvironment;

        public UserController(IUserManagerService userService, IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            _userService = userService;
            _configuration = configuration;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IResult GetUserDetails()
        {
            var userDetails = _userService.GetUserDetail();
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
                userRecord.Body.Image = GetProfilePicture(id);
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
                data = webClient.DownloadData(path);
            }
            return Convert.ToBase64String(data, 0, data.Length);
        }

    }
}