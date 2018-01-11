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

namespace RS.Service.Logic
{
    public class UserManagerService : IUserManagerService
    {
        #region Global Variables
        private readonly IUserRepository _userRepository;
        #endregion
        public UserManagerService(IUserRepository userRepository)
        {
            this._userRepository = userRepository;
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
                var userModel = new Users();
                userModel.MapFromViewModel(user);
                var duplicateUser = _userRepository.GetFirstOrDefault(x => x.UserName == user.UserName || x.Email == user.Email);
                if (duplicateUser != null)
                {
                    result.Status = Status.Fail;
                    result.Message = UserStatusNotification.DuplicateUser;
                    result.Body = null;
                }
                else
                {
                    _userRepository.Create(userModel);
                    _userRepository.SaveChanges();
                    result.Body = userModel;
                }
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Fail;
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
                var users = new List<UserViewModel>();
                var allUsers = _userRepository.GetAll().ToList();
                result.Body = users.MapFromModel<Users, UserViewModel>(allUsers);
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Fail;
            }
            return result;
        }

        public IResult GetUserById(int id)
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var user = new UserViewModel();
                var getUser = _userRepository.GetByID(id);
                result.Body = user.MapFromModel(getUser);
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Fail;
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
                result.Status = Status.Fail;
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
                var userModel = new Users();
                userModel.MapFromViewModel(user);
                var duplicateUser = _userRepository.GetFirstOrDefault(x => x.UserName == user.UserName || x.Email == user.Email);
                if (duplicateUser != null)
                {
                    result.Status = Status.Fail;
                    result.Message = UserStatusNotification.DuplicateUser;
                    result.Body = null;
                }
                else
                {
                    _userRepository.Update(userModel);
                    _userRepository.SaveChanges();
                    result.Body = userModel;
                }

            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Fail;
            }
            return result;
        }

        #endregion

    }
}
