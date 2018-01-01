using RS.Service.Interfaces;
using RS.Common.Enums;
using RS.Entity;
using RS.ViewModel.User;
using System;
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
            Users user =_userRepository.LoginUser(username,Password);
            UserViewModel userView = new UserViewModel()
                                    {
                                        UserId = user.UserId,
                                        UserName = user.UserName,
                                        Email = user.Email
                                    };
            return userView;

        }

        #endregion

    }
}
