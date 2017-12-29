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
    [Route("api/Role/[Action]")]
    [ValidateModel]
    public class RoleController : Controller
    {
        private readonly IRoleManager _roleManager;

        public RoleController(IRoleManager roleManager)
        {
            this._roleManager = roleManager;
          
        }

        //[HttpPost]
        //public HttpResponseMessage RoleCreate([FromBody] RoleModel model)
        //{
        //    StatusEnum.Status status = _roleManager.CreateRole(model);

        //    var resp = new HttpResponseMessage(HttpStatusCode.OK)
        //    {
        //        Content = new StringContent(string.Format(RoleStatusNotification.RoleCreated)),
        //        ReasonPhrase = RoleStatusNotification.RoleCreated,
        //    };
        //    return resp;
        //}

        //[HttpPost]
        //public HttpResponseMessage RoleUpdate([FromBody] RoleModel model)
        //{
        //    StatusEnum.Status status = _roleManager.UpdateRole(model);

        //    var resp = new HttpResponseMessage(HttpStatusCode.OK)
        //    {
        //        Content = new StringContent(string.Format(RoleStatusNotification.RoleUpdated)),
        //        ReasonPhrase = RoleStatusNotification.RoleUpdated,
        //    };
        //    return resp;
        //}

        //[HttpGet]
        //public HttpResponseMessage RoleDelete(Guid roleid)
        //{
        //    StatusEnum.Status status = _roleManager.DeleteRole(roleid);

        //    var resp = new HttpResponseMessage(HttpStatusCode.OK)
        //    {
        //        Content = new StringContent(string.Format(RoleStatusNotification.RoleDeleted)),
        //        ReasonPhrase = RoleStatusNotification.RoleDeleted,
        //    };
        //    return resp;
        //}


        [HttpGet]
        public dynamic GetAllRole()
        {
            var rolelist = _roleManager.GetAllRole();
            return rolelist;
        }

        [HttpGet]
        public dynamic GetRoleByID(Guid id)
        {
            dynamic roleRecord = _roleManager.GetRoleByID(id);
            return roleRecord;
        }
    }
}