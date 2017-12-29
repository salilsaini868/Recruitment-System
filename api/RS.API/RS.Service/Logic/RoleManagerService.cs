using RS.Common.Enums;
using RS.Data.Interfaces;
using RS.ViewModel.Roles;
using RS.Service.Interfaces;
using System;

namespace RS.Service.Logic
{
    public class RoleManager : IRoleManagerService
    {
        private readonly IRoleRepository _roleRepository;
        private RS.Entity.Models.Roles _role;
        public RoleManager(IRoleRepository roleRepository)
        {
            this._roleRepository = roleRepository;
        }

        public StatusEnum.Status CreateRole(RoleModel model)
        {
            StatusEnum.Status status = StatusEnum.Status.Success;
            try
            {
                _role = new RS.Entity.Models.Roles();
                // _role.RoleId = model.RoleId;
                _role.RoleName = model.RoleName;
                //_role.Description = model.Description;
                //_role.IsDeleted = model.IsDeleted;
                //_role.DeletedBy = model.DeletedBy;
                //_role.DeletedDateTime = model.DeletedDateTime;
                //_role.ModifiedBy = model.ModifiedBy;
                //_role.ModifiedDateTime = model.ModifiedDateTime;
                _roleRepository.Create(_role);
                _roleRepository.SaveChanges();
            }
            catch (Exception)
            {
                status = StatusEnum.Status.Fail;
                throw;
            }

            return status;
        }

        public StatusEnum.Status UpdateRole(RoleModel model)
        {
            StatusEnum.Status status = StatusEnum.Status.Success;
            try
            {
                RS.Entity.Models.Roles roleUpdate = _roleRepository.GetByID(model.RoleId);
                roleUpdate.RoleId = model.RoleId;
                roleUpdate.RoleName = model.RoleName;
                //roleUpdate.Description = model.Description;
                //roleUpdate.IsDeleted = model.IsDeleted;
                //roleUpdate.DeletedBy = model.DeletedBy;
                //roleUpdate.DeletedDateTime = model.DeletedDateTime;
                //roleUpdate.ModifiedBy = model.ModifiedBy;
                //roleUpdate.ModifiedDateTime = model.ModifiedDateTime;
                _roleRepository.Update(roleUpdate);
                _roleRepository.SaveChanges();

            }
            catch (Exception)
            {
                status = StatusEnum.Status.Fail;
                throw;
            }
            return status;
        }

        public StatusEnum.Status DeleteRole(Guid id)
        {
            StatusEnum.Status status = StatusEnum.Status.Success;
            try
            {
                RS.Entity.Models.Roles roleDelete = _roleRepository.GetByID(id);
                //roleDelete.IsDeleted = true;
                _roleRepository.Update(roleDelete);
                _roleRepository.SaveChanges();
            }
            catch (Exception)
            {
                status = StatusEnum.Status.Fail;
            }
            return status;
        }

        public dynamic GetAllRole()
        {
            //dynamic AllRoles = _roleRepository.GetAll(x => x.IsDeleted == false);
            dynamic AllRoles = _roleRepository.GetAll();
            return AllRoles;
        }
        public dynamic GetRoleByID(Guid id)
        {
            dynamic getRecord = _roleRepository.GetByID(id);
            return getRecord;

        }
    }
}
