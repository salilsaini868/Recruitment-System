using RS.Data.Interfaces;
using RS.Data;
using RS.Entity;
using RS.Entity.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;
using RS.ViewModel.User;

namespace RS.Data.Logic
{
    public class UserRepository: Repository<Users>, IUserRepository
    {
        private readonly RSContext _context;
        private DbSet<Users> entities;
        public UserRepository(RSContext context) : base(context) {
            this._context = context;
        }

        public Users LoginUser(string username, string password)
        {
            Users user = _context.Users.Where(x => x.UserName == username && x.Password == password)
                                .Select(x => x ).SingleOrDefault();

            return user;
        }
    }
}
