using RS.Service.Interfaces;
using RS.Common.Enums;
using RS.Entity;
using RS.ViewModel.User;
using System;
using RS.Data.Interfaces;

namespace RS.Service.Logic
{
    public class CandidateManagerService : ICandidateManagerService
    {
        #region Global Variables
        private readonly ICandidateRepository _candidateRepository;
        #endregion
        public CandidateManagerService(ICandidateRepository candidateRepository)
        {
            _candidateRepository = candidateRepository;
        }


    }
}
