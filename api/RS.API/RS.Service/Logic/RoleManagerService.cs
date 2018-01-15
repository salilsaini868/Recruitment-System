using RS.Common.Enums;
using RS.Data.Interfaces;
using RS.ViewModel.Roles;
using RS.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using RS.Common.CommonData;
using RS.Common.Extensions;
using RS.Entity.Models;

namespace RS.Service.Logic
{
    public class RoleManager : IRoleManagerService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleManager(IRoleRepository roleRepository)
        {
            this._roleRepository = roleRepository;
        }

        public IResult GetAllRole()
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var roles = new List<RoleViewModel>();
                var allRoles = _roleRepository.GetAll().ToList();
                result.Body = roles.MapFromModel<Roles, RoleViewModel>(allRoles);
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;

        }
        public IResult GetRoleById(int id)
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var role = new RoleViewModel();
                var getRole = _roleRepository.GetByID(id);
                result.Body = role.MapFromModel(getRole);
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }
    }
}
