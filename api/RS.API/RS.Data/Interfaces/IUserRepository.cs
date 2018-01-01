using RS.Data.Interfaces;
using RS.Entity.Models;
using RS.ViewModel.User;

namespace RS.Data.Interfaces
{
    public interface IUserRepository: IRepository<Users>
    {
        Users LoginUser(string username, string password);
    }
}
