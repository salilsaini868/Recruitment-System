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

        public IResult createUser(UserViewModel user)
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
                    result.Message = SkillStatusNotification.DuplicateSkill;
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
            throw new NotImplementedException();
        }

        public IResult GetUserById(int id)
        {
            throw new NotImplementedException();
        }
        #region private members

        #endregion private members

        #region public methods

        public UserViewModel LoginUser(string username, string Password)
        {
            UserViewModel userView = null;
            var user = _userRepository.LoginUser(username, Password);
            if (user != null)
            {
                userView = new UserViewModel();
                userView.MapFromModel(user, "UserName;");
                userView.FullName = user.FirstName + " " + user.LastName;
                var firstOrDefault = user.UserRoles.FirstOrDefault();
                if (firstOrDefault != null) userView.Role = firstOrDefault.Role.Name;
            }
            return userView;
        }

        public IResult updateUser(UserViewModel user)
        {
            throw new NotImplementedException();
        }

        #endregion

    }
}
