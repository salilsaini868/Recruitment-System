using RS.Service.Interfaces;
using RS.Common.Enums;
using RS.Entity;
using RS.ViewModel.User;
using System;
using RS.Data.Interfaces;
using RS.Common.CommonData;
using RS.ViewModel.Candidate;
using RS.Entity.Models;
using System.Security.Claims;
using System.Security.Principal;
using RS.Common.Extensions;
using System.Collections.Generic;
using System.Linq;

namespace RS.Service.Logic
{
    public class CandidateManagerService : ICandidateManagerService
    {
        private readonly ClaimsPrincipal _principal;
        #region Global Variables
        private readonly ICandidateRepository _candidateRepository;
        #endregion
        public CandidateManagerService(IPrincipal principal, ICandidateRepository candidateRepository)
        {
            _principal = principal as ClaimsPrincipal;
            _candidateRepository = candidateRepository;
        }

        public IResult AddCandidate(CandidateViewModel candidate)
        {
            var result = new Result
            {
                Operation = Operation.Create,
                Status = Status.Success
            };
            try
            {
                var candidateModel = new Candidates();
                candidateModel.MapFromViewModel(candidate, (ClaimsIdentity)_principal.Identity);
                _candidateRepository.Create(candidateModel);
                _candidateRepository.SaveChanges();
                result.Body = candidateModel;

            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }

        public IResult DeleteCandidate(Guid id)
        {
            throw new NotImplementedException();
        }

        public IResult GetAllCandidate()
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var candidates = new List<CandidateViewModel>();
                var allCandidates = _candidateRepository.GetAll().ToList();
                result.Body = candidates.MapFromModel<Candidates, CandidateViewModel>(allCandidates);
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }

        public IResult GetCandidateById(Guid id)
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var candidate = new CandidateViewModel();
                var getCandidate = _candidateRepository.GetByID(id);
                result.Body = candidate.MapFromModel(getCandidate);
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }

        public IResult UpdateCandidate(CandidateViewModel candidate)
        {
            var result = new Result
            {
                Operation = Operation.Update,
                Status = Status.Success
            };
            try
            {
                var candidateModel = new Candidates();
                candidateModel.MapFromViewModel(candidate, (ClaimsIdentity)_principal.Identity);
                _candidateRepository.Update(candidateModel);
                _candidateRepository.SaveChanges();
                result.Body = candidateModel;

            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }
    }
}
