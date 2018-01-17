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

        void UpdateUserRole(UserRoles userRole);

        new List<Users> GetAll();

        Users GetByID(Guid userId);
    }
}
