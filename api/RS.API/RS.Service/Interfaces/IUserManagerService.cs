using RS.Common.CommonData;
using RS.Common.Enums;
using RS.ViewModel.User;
using System;

namespace RS.Service.Interfaces
{
    public interface IUserManagerService
    {
        UserViewModel LoginUser(string Email, string Password);

        IResult createUser(UserViewModel user);

        IResult updateUser(UserViewModel user);

        IResult GetAllUser();

        IResult GetUserById(int id);
    }
}
