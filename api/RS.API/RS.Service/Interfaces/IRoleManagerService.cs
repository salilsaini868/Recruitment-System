using RS.Common.Enums;
using RS.ViewModel.Roles;
using System;

namespace RS.Service.Interfaces
{
    public interface IRoleManagerService
    {
        /// <summary>
        /// Create a new Role
        /// </summary>
        /// <param name="model">role data in model</param>
        /// <returns></returns>
        Status CreateRole(RoleModel model);
        /// <summary>
        /// update a  Role
        /// </summary>
        /// <param name="model">role data in model</param>
        /// <returns></returns>

        Status UpdateRole(RoleModel model);
        /// <summary>
        /// Delete a  Role
        /// </summary>
        /// <param name="model">role data in model</param>
        /// <returns></returns>
        Status DeleteRole(Guid id);
        /// <summary>
        /// Get Role Info
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        dynamic GetAllRole();
        /// <summary>
        /// Delete a  Role
        /// </summary>
        /// <param name="id">role id</param>
        /// <returns></returns>
        dynamic GetRoleByID(Guid id);
    }
}
