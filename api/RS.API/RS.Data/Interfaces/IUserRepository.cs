using RS.Data.Interfaces;
using RS.Entity.Models;

namespace RS.Data.Interfaces
{
    public interface IUserRepository: IRepository<Users>
    {
        Users LoginUser(string username, string password);
    }
}
