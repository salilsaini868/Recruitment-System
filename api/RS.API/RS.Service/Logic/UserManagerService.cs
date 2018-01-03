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
    public class UserManagerService : IUserService
    {
        #region Global Variables
        private readonly IUserRepository _userRepository;
        #endregion
        public UserManagerService(IUserRepository userRepository)
        {
            this._userRepository = userRepository;
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

        #endregion

    }
}
