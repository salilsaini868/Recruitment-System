using RS.Common.CommonData;
using RS.Common.Enums;
using RS.ViewModel.User;
using System;

namespace RS.Service.Interfaces
{
    public interface IUserManagerService
    {
        IResult LoginUser(string userName, string password);

        IResult CreateUser(UserViewModel user);

        IResult UpdateUser(UserViewModel user);

        IResult GetAllUser();

        IResult GetUserById(int id);
    }
}
