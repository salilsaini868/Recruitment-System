using RS.Service.Interfaces;
using RS.Common.Enums;
using RS.Entity;
using RS.ViewModel.User;
using System;
using RS.Data.Interfaces;

namespace RS.Service.Logic
{
    public class OpeningManagerService : IOpeningManagerService
    {
        #region Global Variables
        private readonly IOpeningRepository _openingRepository;
        #endregion
        public OpeningManagerService(IOpeningRepository openingRepository)
        {
            _openingRepository = openingRepository;
        }
    }
}
