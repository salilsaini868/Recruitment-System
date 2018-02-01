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
        private readonly IOpeningRepository _openingRepository;
        private readonly IQualificationRepository _qualificationRepository;
        #endregion
        public CandidateManagerService(IPrincipal principal, ICandidateRepository candidateRepository, IOpeningRepository openingRepository, IQualificationRepository qualificationRepository)
        {
            _principal = principal as ClaimsPrincipal;
            _candidateRepository = candidateRepository;
            _openingRepository = openingRepository;
            _qualificationRepository = qualificationRepository;
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
                candidateModel.QualificationId = candidate.Qualification;

                var openingCandidate = new OpeningCandidates();
                openingCandidate.OpeningId = candidate.Opening;
                openingCandidate.candidate = candidateModel;
                openingCandidate.MapAuditColumns((ClaimsIdentity)_principal.Identity);

                var organization = new Organizations();
                organization.Name = candidate.Organization;
                organization.MapAuditColumns((ClaimsIdentity)_principal.Identity);

                _candidateRepository.AddCandidate(candidateModel, openingCandidate, organization);
                result.Body = candidateModel.CandidateId;
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
                var allCandidates = _candidateRepository.GetAll();
                var candidateList = allCandidates.Select(candidate =>
                {
                    var openingCandidate = _candidateRepository.GetOpeningCandidate(candidate.CandidateId);
                    var candidateListModel = new CandidateListModel();
                    if (openingCandidate != null)
                    {
                        candidateListModel.Opening = openingCandidate.Opening.Title;
                        candidateListModel.ModifiedDate = openingCandidate.Opening.ModifiedDate;
                    }
                    return candidateListModel.MapFromModel(candidate);
                }).ToList();
                List<CandidateListModel> candidateListViewModel = candidateList.Cast<CandidateListModel>().ToList();
                result.Body = candidateListViewModel.OrderByDescending(x => x.ModifiedDate);
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
                var openingCandidate = _candidateRepository.GetOpeningCandidate(getCandidate.CandidateId);
                candidate.Opening = openingCandidate.Opening.OpeningId;
                candidate.Qualification = getCandidate.Qualification.QualificationId;
                candidate.Organization = getCandidate.Organisation.Name;
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
                var candidateModel = _candidateRepository.GetByID(candidate.CandidateId);
                candidateModel.MapFromViewModel(candidate, (ClaimsIdentity)_principal.Identity);
                candidateModel.QualificationId = candidate.Qualification;

                var organizationModel = _candidateRepository.GetOrganization(candidate.Organization);
                if (organizationModel != null)
                {
                    candidateModel.OrganizationId = organizationModel.OrganizationId;
                }

                var organization = new Organizations();
                organization.Name = candidate.Organization;
                organization.MapAuditColumns((ClaimsIdentity)_principal.Identity);

                var openingCandidate = _candidateRepository.GetOpeningCandidate(candidate.CandidateId);
                var updatedOpeningCandidate = new OpeningCandidates();
                if ((openingCandidate != null) && (openingCandidate.Opening.OpeningId != candidate.Opening))
                {
                    openingCandidate.MapDeleteColumns((ClaimsIdentity)_principal.Identity);
                    updatedOpeningCandidate.CandidateId = candidateModel.CandidateId;
                    updatedOpeningCandidate.OpeningId = candidate.Opening;
                    updatedOpeningCandidate.MapAuditColumns((ClaimsIdentity)_principal.Identity);
                }
                _candidateRepository.UpdateCandidate(candidateModel, updatedOpeningCandidate, organization);
                result.Body = candidate.CandidateId;

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
