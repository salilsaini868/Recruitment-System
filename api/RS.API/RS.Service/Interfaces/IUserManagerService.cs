using RS.Common.Enums;
using RS.ViewModel.User;
using System;

namespace RS.Service.Interfaces
{
    public interface IUserService
    {
        UserViewModel LoginUser(string Email, string Password);

    }
}
