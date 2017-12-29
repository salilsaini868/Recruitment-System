using RS.Service.Interfaces;
using RS.Common.Enums;
using RS.Entity;
using RS.ViewModel.User;
using System;
using RS.Data.Interfaces;

namespace RS.Service.Logic
{
    public class UserService : IUserService
    {
        #region Global Variables
        private readonly IUserRepository _userRepository;
        #endregion
        public UserService(IUserRepository userRepository)
        {
            this._userRepository = userRepository;
        }
        #region private members

        private const int PASSWORD_REHASH_TIMES = 256000;
        private const int PIN_HASH_TIMES = 1;
        private RS.Entity.Models.Users _user;

        #endregion private members

        #region public methods

        public StatusEnum.Status SaveUser(UserModel model)
        {
            StatusEnum.Status status = StatusEnum.Status.Success;
            try
            {
                _user = new RS.Entity.Models.Users();
                _user.UserName = model.UserName;
                _user.Password = model.Password;
                _user.Email = model.Email;

                _userRepository.Create(_user);
                _userRepository.SaveChanges();
            }
            catch (Exception)
            {
                status = StatusEnum.Status.Fail;
            }
            return status;
        }

        public StatusEnum.Status UpdateUser(UserModel model)
        {
            StatusEnum.Status status = StatusEnum.Status.Success;
            try
            {
                RS.Entity.Models.Users user = _userRepository.GetByID(model.UserId);
                user.UserName = model.UserName;
                //user.TelMobile = model.TelMobile;
                //user.TelMainTwo = model.TelMainTwo;
                //user.TelMainOne = model.TelMainOne;
                //user.Telex = model.Telex;
                //user.Prefix = model.Prefix;
                //user.Password = model.Password;
                //user.OfficeId = Guid.NewGuid();
                //user.ModifiedDateTime = null;
                //user.MiddleName = model.MiddleName;
                //user.LastName = model.LastName;
                //user.LastLoginDateTime = null;
                //user.IsDeleted = false;
                //user.IsActive = true;
                //user.FirstName = model.FirstName;
                //user.EntityId = model.EntityId;
                //user.EmailAddress = model.emailAddress;
                //user.DeletedDateTime = null;
                //user.CreatedDateTime = DateTime.UtcNow;
                _userRepository.Update(user);
                _userRepository.SaveChanges();
            }
            catch (Exception)
            {
                status = StatusEnum.Status.Fail;
            }
            return status;
        }


        public dynamic GetAllUser()
        {
            //dynamic AllUsers = _userRepository.GetAll(x => x.IsActive == true & x.IsDeleted == false);
            dynamic AllUsers = _userRepository.GetAll();
            return AllUsers;
        }

        public dynamic GetUser(Guid id)
        {
            dynamic user = _userRepository.GetByID(id);
            return user;
        }

        public StatusEnum.Status DeleteUser(Guid id)
        {
            StatusEnum.Status status = StatusEnum.Status.Success;
            try
            {
                RS.Entity.Models.Users userDelete = _userRepository.GetByID(id);
                //userDelete.IsDeleted = true;
                _userRepository.Update(userDelete);
                _userRepository.SaveChanges();
            }
            catch (Exception)
            {
                status = StatusEnum.Status.Fail;
            }
            return status;
        }

        public dynamic LoginUser(string Email, string Password)
        {
            try
            {
                //var getUserDetails = _userRepository.Get(x => x.EmailAddress == Email && x.Password == Password);
                var getUserDetails = _userRepository.Get(x => x.Email == Email);
                if (getUserDetails != null)
                {
                    return getUserDetails;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return "UserName or password Not match";
        }

        #endregion

    }
}
