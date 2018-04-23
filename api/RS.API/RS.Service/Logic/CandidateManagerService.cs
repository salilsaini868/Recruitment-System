using RS.Service.Interfaces;
using RS.Common.Enums;
using RS.Entity;
using RS.ViewModel.User;
using System;
using System.Threading.Tasks;
using RS.Data.Interfaces;
using RS.Common.CommonData;
using RS.ViewModel.Candidate;
using RS.Entity.Models;
using System.Security.Claims;
using System.Security.Principal;
using RS.Common.Extensions;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using RS.ViewModel.Organization;

namespace RS.Service.Logic
{
    public class CandidateManagerService : ICandidateManagerService
    {
        #region Global Variables
        private readonly ClaimsPrincipal _principal;
        private readonly ICandidateRepository _candidateRepository;
        private readonly IApprovalRepository _approvalRepository;
        private readonly IOpeningRepository _openingRepository;
        private readonly IQualificationRepository _qualificationRepository;

        #endregion
        public CandidateManagerService(IPrincipal principal, ICandidateRepository candidateRepository,
            IOpeningRepository openingRepository, IQualificationRepository qualificationRepository, IApprovalRepository approvalRepository)
        {
            _principal = principal as ClaimsPrincipal;
            _candidateRepository = candidateRepository;
            _openingRepository = openingRepository;
            _qualificationRepository = qualificationRepository;
            _approvalRepository = approvalRepository;
        }

        public IResult AddCandidate(CandidateViewModel candidateViewModel, CandidateDocumentViewModel candidateDocumentViewModel)
        {
            var result = new Result
            {
                Operation = Operation.Create,
                Status = Status.Success
            };
            try
            {
                var candidateModel = new Candidates();
                candidateModel.MapFromViewModel(candidateViewModel, (ClaimsIdentity)_principal.Identity);
                candidateModel.QualificationId = candidateViewModel.Qualification;

                #region Insert OpeningCandidate
                var openingCandidate = new OpeningCandidates();
                openingCandidate.OpeningId = candidateViewModel.OpeningId;
                openingCandidate.Candidate = candidateModel;
                openingCandidate.MapAuditColumns((ClaimsIdentity)_principal.Identity); 
                #endregion

                #region Insert Organization
                Organizations organization = null;
                if (candidateViewModel.OrganizationId != 0)
                {
                    candidateModel.OrganizationId = candidateViewModel.OrganizationId;
                }
                else
                {
                    organization = new Organizations
                    {
                        Name = candidateViewModel.OrganizationName
                    };
                    organization.MapAuditColumns((ClaimsIdentity)_principal.Identity);
                    candidateModel.Organisation = organization;
                }
                #endregion

                #region Insert Candidate Document 
                var candidateDocumentModel = new CandidateDocuments();
                candidateDocumentModel.MapFromViewModel(candidateDocumentViewModel, (ClaimsIdentity)_principal.Identity);
                candidateModel.CandidateDocuments.Add(candidateDocumentModel);
                #endregion

                _candidateRepository.AddCandidate(candidateModel, openingCandidate);
                result.Body = candidateModel.CandidateId;
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }

        public IResult AssignUserForCandidate(List<CandidateAssignedUserModel> candidateAssignedUserList)
        {
            var result = new Result
            {
                Operation = Operation.Create,
                Status = Status.Success
            };
            try
            {
                var assignedUserList = _candidateRepository.GetAssignedUsersByID(candidateAssignedUserList[0].CandidateId);
                var approvalEvents = _approvalRepository.GetApprovalEvents((int)Approval.Candidate);
                var addingAssignedUsers = new List<CandidateAssignedUserModel>();
                if (assignedUserList.Any())
                {
                    foreach (var approvalEvent in approvalEvents)
                    {
                        var candidateAssignedUserModelsList = candidateAssignedUserList.Where(x => x.ApprovalEventId == approvalEvent.ApprovalEventId).Select(y => y.UserId).ToList();
                        var candidateAssignedUserModels = assignedUserList.Where(x => x.ApprovalEventId == approvalEvent.ApprovalEventId).Select(y => y.UserId).ToList();

                        if (candidateAssignedUserModelsList.Any() && candidateAssignedUserModels.Any())
                        {
                            var existingAssignedUsers = candidateAssignedUserModelsList.Intersect(candidateAssignedUserModels).ToList();
                            var addAssignedUsers = candidateAssignedUserModelsList.Except(existingAssignedUsers).ToList();
                            var removingAssignedusers = candidateAssignedUserModelsList.Except(existingAssignedUsers).ToList();

                            if (existingAssignedUsers.Any())
                            {
                                var assignedUsers = assignedUserList.Where(x => existingAssignedUsers.Contains(x.UserId) && x.ApprovalEventId == approvalEvent.ApprovalEventId).ToList();
                                assignedUsers.ForEach(x => x.MapAuditColumns((ClaimsIdentity)_principal.Identity));
                            }

                            if (removingAssignedusers.Any())
                            {
                                var assignedUsers = assignedUserList.Where(x => removingAssignedusers.Contains(x.UserId) && x.ApprovalEventId == approvalEvent.ApprovalEventId).ToList();
                                assignedUsers.ForEach(x => x.MapDeleteColumns((ClaimsIdentity)_principal.Identity));
                            }

                            if (addAssignedUsers.Any())
                            {
                                addingAssignedUsers = candidateAssignedUserList.Where(x => addAssignedUsers.Contains(x.UserId) && x.ApprovalEventId == approvalEvent.ApprovalEventId).ToList();
                            }
                        }
                    }
                }
                else
                {
                    addingAssignedUsers = candidateAssignedUserList;
                }

                if (addingAssignedUsers.Any())
                {
                    foreach (var assignedUser in addingAssignedUsers)
                    {
                        var assignedUserForCandidate = new CandidateAssignedUser();
                        assignedUserForCandidate.MapFromViewModel(assignedUser, (ClaimsIdentity)_principal.Identity);
                        _candidateRepository.AssignUserForCandidate(assignedUserForCandidate);
                    }
                }

                result.Body = candidateAssignedUserList;
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }

        public IResult ApprovedForInterview(Guid candidateId)
        {
            var result = new Result
            {
                Operation = Operation.Update,
                Status = Status.Success
            };
            try
            {
                var candidateModel = _candidateRepository.GetByID(candidateId);
                if (candidateModel != null)
                {
                    candidateModel.IsReadyForInterview = true;
                    _candidateRepository.ApprovedForInterview(candidateModel);
                }
                var candidateViewModel = new CandidateViewModel();
                candidateViewModel.MapFromModel(candidateModel);
                result.Body = candidateViewModel.CandidateId;

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

                    var assignedUsers = _candidateRepository.GetAssignedUsersByID(candidate.CandidateId);
                    candidateListModel.AssignedUsers = assignedUsers.Count;
                    candidateListModel.Documents = candidate.CandidateDocuments.Count;
                    var approvalTransaction = _approvalRepository.GetApprovalTransactionByEntity(candidate.CandidateId);
                    if (!candidate.IsReadyForInterview)
                    {
                        candidateListModel.Status = "Created";
                    }
                    else
                    {
                        candidateListModel.Status = approvalTransaction == null ? "Ready For Interview" : approvalTransaction.ApprovalAction.ApprovalActionName;
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

        public IResult GetAssignedUsersById(Guid candidateId)
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var assignedUsersList = new List<CandidateAssignedUser>();
                var assignedUsers = _candidateRepository.GetAssignedUsersByID(candidateId);
                result.Body = assignedUsersList.MapFromModel<CandidateAssignedUser, CandidateAssignedUserModel>(assignedUsers);
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
                var candidateViewModel = new CandidateViewModel();
                var getCandidate = _candidateRepository.GetByID(id);
                var openingCandidate = _candidateRepository.GetOpeningCandidate(getCandidate.CandidateId);
                candidateViewModel.OpeningId = openingCandidate.Opening.OpeningId;
                candidateViewModel.OpeningTitle = openingCandidate.Opening.Title;
                candidateViewModel.Qualification = getCandidate.Qualification.QualificationId;
                candidateViewModel.QualificationName = getCandidate.Qualification.Name;
                candidateViewModel.OrganizationName = getCandidate.Organisation.Name;
                var candidateDocument = new CandidateDocumentViewModel();
                candidateViewModel.CandidateDocument = (CandidateDocumentViewModel)candidateDocument.MapFromModel(getCandidate.CandidateDocuments.FirstOrDefault());
                result.Body = candidateViewModel.MapFromModel(getCandidate);
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }

        public IResult GetCandidatesCorrespondingToLoggedUser(Guid userId)
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var allCandidates = _candidateRepository.GetCandidatesCorrespondingToLoggedUser(userId);
                var candidateList = allCandidates.Select(candidate =>
                {
                    var openingCandidate = _candidateRepository.GetOpeningCandidate(candidate.CandidateId);
                    var candidateListModel = new CandidateListModel();
                    if (openingCandidate != null)
                    {
                        candidateListModel.Opening = openingCandidate.Opening.Title;
                        candidateListModel.ModifiedDate = openingCandidate.Opening.ModifiedDate;
                    }

                    var approvalTransaction = _approvalRepository.GetApprovalTransactionByEntity(candidate.CandidateId);
                    if (!candidate.IsReadyForInterview)
                    {
                        candidateListModel.Status = "Created";
                    }
                    else
                    {
                        candidateListModel.Status = approvalTransaction == null ? "Ready For Interview" : approvalTransaction.ApprovalAction.ApprovalActionName;
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

        public IResult UpdateCandidate(CandidateViewModel candidateViewModel, CandidateDocumentViewModel candidateDocumentViewModel)
        {
            var result = new Result
            {
                Operation = Operation.Update,
                Status = Status.Success
            };
            try
            {
                var candidateModel = _candidateRepository.GetByID(candidateViewModel.CandidateId);
                candidateModel.MapFromViewModel(candidateViewModel, (ClaimsIdentity)_principal.Identity);
                candidateModel.QualificationId = candidateViewModel.Qualification;

                #region Organization insert update
                Organizations organization = null;
                if (candidateModel.OrganizationId != candidateViewModel.OrganizationId)
                {
                    if (candidateViewModel.OrganizationId != 0)
                    {
                        candidateModel.OrganizationId = candidateViewModel.OrganizationId;
                    }
                    else
                    {
                        organization = new Organizations
                        {
                            Name = candidateViewModel.OrganizationName
                        };
                        organization.MapAuditColumns((ClaimsIdentity)_principal.Identity);
                        candidateModel.Organisation = organization;
                    }
                }
                #endregion

                #region OpeningCandidate Update
                var openingCandidateModel = _candidateRepository.GetOpeningCandidate(candidateViewModel.CandidateId);
                if ((openingCandidateModel != null) && (openingCandidateModel.Opening.OpeningId != candidateViewModel.OpeningId))
                {
                    openingCandidateModel.OpeningId = candidateViewModel.OpeningId;
                    openingCandidateModel.MapAuditColumns((ClaimsIdentity)_principal.Identity);
                } 
                #endregion

                #region Candidate Document Insert Update
                var candidateDocumentModel = candidateModel.CandidateDocuments.FirstOrDefault();
                if (candidateDocumentViewModel != null)
                {
                    candidateDocumentModel.MapFromViewModel(candidateDocumentViewModel, (ClaimsIdentity)_principal.Identity);
                }
                candidateModel.CandidateDocuments.Add(candidateDocumentModel);
                #endregion

                _candidateRepository.UpdateCandidate(candidateModel, openingCandidateModel);
                result.Body = candidateModel.CandidateId;

            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }

        public IResult GetOrganizationsOnInputChanged(string input)
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                List<OrganizationViewModel> organizationModels = new List<OrganizationViewModel>(); 
                var organizations = _candidateRepository.GetOrganizationsOnInputChanged(input);
                result.Body = organizationModels.MapFromModel<Organizations, OrganizationViewModel>(organizations);
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
