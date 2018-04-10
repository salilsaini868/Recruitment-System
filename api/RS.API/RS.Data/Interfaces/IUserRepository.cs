using RS.Data.Interfaces;
using RS.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RS.Data.Interfaces
{
    public interface IUserRepository: IRepository<Users>
    {
        Users LoginUser(string username, string password);

        void CreateUser(Users userModel, UserRoles userRole);

        Users GetUser(Guid userId, string password);

        void UpdateUserRole(UserRoles userRole);

        new List<Users> GetAll();

        Users GetByID(Guid userId);

        List<Users> GetUsersByRole(int roleId);

        Users GetEmailIdByUserName(String userName);

        void UpdateUser(Users user);
    }
}
