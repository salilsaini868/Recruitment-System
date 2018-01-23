using RS.Service.Interfaces;
using RS.Common.Enums;
using RS.Common.Extensions;
using RS.Entity;
using RS.ViewModel.User;
using System;
using System.Linq;
using RS.Data.Interfaces;
using RS.Common.CommonData;
using RS.Entity.Models;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;

namespace RS.Service.Logic
{
    public class UserManagerService : IUserManagerService
    {
        #region Global Variables
        private readonly ClaimsPrincipal _principal;
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;

        #endregion
        public UserManagerService(IPrincipal principal, IUserRepository userRepository, IRoleRepository roleRepository)
        {
            this._userRepository = userRepository;
            this._roleRepository = roleRepository;
            this._principal = principal as ClaimsPrincipal;
        }

        public IResult CreateUser(UserViewModel user)
        {
            var result = new Result
            {
                Operation = Operation.Create,
                Status = Status.Success
            };
            try
            {
                var duplicateUserName = _userRepository.GetFirstOrDefault(x => (x.IsActive && !x.IsDeleted) && (x.UserName == user.UserName));
                var duplicateEmail = _userRepository.GetFirstOrDefault(x => (x.IsActive && !x.IsDeleted) && (x.Email == user.Email));
                if (duplicateUserName != null)
                {
                    result.Status = Status.Fail;
                    result.Message = UserStatusNotification.DuplicateUserName;
                    result.Body = null;
                    return result;
                }
                else if (duplicateEmail != null)
                {
                    result.Status = Status.Fail;
                    result.Message = UserStatusNotification.DuplicateEmail;
                    result.Body = null;
                    return result;
                }
                else
                {
                    var userModel = new Users();
                    userModel.MapFromViewModel(user, (ClaimsIdentity)_principal.Identity);

                    UserRoles userRole = new UserRoles();
                    userRole.RoleId = user.RoleId;
                    userRole.Role = _roleRepository.GetByID(user.RoleId);
                    userRole.MapAuditColumns((ClaimsIdentity)_principal.Identity);
                    _userRepository.CreateUser(userModel, userRole);
                    result.Body = userModel;
                }
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;

        }

        public IResult GetAllUser()
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var allUsers = _userRepository.GetAll().ToList();
                result.Body = allUsers.Select(user =>
                {
                    var getUserRole = user.UserRoles.FirstOrDefault(x => (x.IsActive && !x.IsDeleted));
                    var userViewModel = new UserViewModel();
                    if (getUserRole != null)
                    {
                        userViewModel.RoleId = getUserRole.RoleId;
                        userViewModel.Role = getUserRole.Role.Name;
                    }
                    return userViewModel.MapFromModel(user);
                }).ToList();
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }

        public IResult GetUserById(Guid id)
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var getUser = _userRepository.GetByID(id);
                var getUserRole = getUser.UserRoles.FirstOrDefault(x => (x.IsActive && !x.IsDeleted));
                var user = new UserViewModel();
                if (getUserRole != null)
                {
                    user.RoleId = getUserRole.RoleId;
                    user.Role = getUserRole.Role.Name;
                }
                result.Body = user.MapFromModel(getUser);
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }
        #region private members

        #endregion private members

        #region public methods

        public IResult LoginUser(string username, string password)
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var user = _userRepository.LoginUser(username, password);
                if (user != null)
                {
                    var userView = new UserViewModel();
                    userView.MapFromModel(user, "UserName;");
                    userView.FullName = user.FirstName + " " + user.LastName;
                    var firstOrDefault = user.UserRoles.FirstOrDefault();
                    if (firstOrDefault != null) userView.Role = firstOrDefault.Role.Name;

                    result.Body = userView;
                }
                else
                {
                    result.Message = UserStatusNotification.InValidUser;
                    result.Status = Status.Fail;
                }
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }

        public IResult UpdateUser(UserViewModel user)
        {
            var result = new Result
            {
                Operation = Operation.Update,
                Status = Status.Success
            };
            try
            {
                var duplicateUserName = _userRepository.GetFirstOrDefault(x => (x.IsActive && !x.IsDeleted) && (x.UserName == user.UserName) && (x.UserId != user.UserId));
                var duplicateEmail = _userRepository.GetFirstOrDefault(x => (x.IsActive && !x.IsDeleted) && (x.Email == user.Email) && (x.UserId != user.UserId));
                if (duplicateUserName != null)
                {
                    result.Status = Status.Fail;
                    result.Message = UserStatusNotification.DuplicateUserName;
                    result.Body = null;
                    return result;
                }
                else if (duplicateEmail != null)
                {
                    result.Status = Status.Fail;
                    result.Message = UserStatusNotification.DuplicateEmail;
                    result.Body = null;
                    return result;
                }
                else
                {
                    var userModel = new Users();
                    userModel.MapFromViewModel(user, (ClaimsIdentity)_principal.Identity);
                    var userDetail = _userRepository.GetByID(user.UserId);
                    var userRoleModel = userDetail.UserRoles.Where(x => (x.IsActive && !x.IsDeleted) && x.RoleId != user.RoleId).ToList();

                    if (userRoleModel != null)
                    {
                        userRoleModel.ForEach(x => x.MapDeleteColumns((ClaimsIdentity)_principal.Identity));
                        var userRole = new UserRoles();
                        userRole.RoleId = user.RoleId;
                        userRole.Role = _roleRepository.GetByID(user.RoleId);
                        userRole.MapAuditColumns((ClaimsIdentity)_principal.Identity);
                        _userRepository.UpdateUserRole(userRole);
                    }
                    _userRepository.Update(userModel);
                    _userRepository.SaveChanges();
                    result.Body = userModel;
                }

            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }

        #endregion

    }
}
