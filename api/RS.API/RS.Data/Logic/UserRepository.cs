using RS.Data.Interfaces;
using RS.Data;
using RS.Entity;
using RS.Entity.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using System.Collections.Generic;

namespace RS.Data.Logic
{
    public class UserRepository : Repository<Users>, IUserRepository
    {
        private readonly RSContext _context;
        public UserRepository(RSContext context) : base(context)
        {
            this._context = context;
        }

        public void CreateUser(Users user, UserRoles userRole)
        {
            user.UserRoles.Add(userRole);
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public Users GetByID(Guid userId)
        {
            return _context.Users.Include(t => t.UserRoles).ThenInclude(r => r.Role).FirstOrDefault(x => (x.IsActive && !x.IsDeleted) && (x.UserId == userId));
        }

        public Users LoginUser(string username, string password)
        {
            return _context.Users.Include(t => t.UserRoles).ThenInclude(r => r.Role).FirstOrDefault(x => (x.IsActive && !x.IsDeleted) && (x.UserName == username.ToLower() && x.Password == password.ToLower()));
        }

        public void UpdateUserRole(UserRoles userRole)
        {
            _context.UserRoles.Add(userRole);
        }

        List<Users> IUserRepository.GetAll()
        {
            return _context.Users.Include(t => t.UserRoles).ThenInclude(r => r.Role).Where(x => (x.IsActive && !x.IsDeleted)).ToList();
        }
    }
}
