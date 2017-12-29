using RS.Data.Interfaces;
using RS.Data;
using RS.Entity;
using RS.Entity.Models;

namespace RS.Data.Logic
{
    public class UserRepository: Repository<Users>, IUserRepository
    {
        private readonly RSContext _context;
        public UserRepository(RSContext context) : base(context) {
            this._context = context;
        }
    }
}
