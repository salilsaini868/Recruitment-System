using Microsoft.EntityFrameworkCore;
using RS.Data;
using RS.Data.Interfaces;
using RS.Entity.Models;
using System.Collections.Generic;
using System.Linq;
using System;
using RS.ViewModel.SearchAndSortModel;
using RS.Entity.DTO;

namespace RS.Data.Logic
{
    public class CandidateRepository : Repository<Candidates>, ICandidateRepository
    {
        private readonly RSContext _context;
        public CandidateRepository(RSContext context) : base(context)
        {
            this._context = context;
        }

        public void AddCandidate(Candidates candidate, OpeningCandidates openingCandidate)
        {
            _context.Candidates.Add(candidate);
            _context.OpeningCandidates.Add(openingCandidate);
            _context.SaveChanges();
        }

        public void UpdateCandidate(Candidates candidate, OpeningCandidates openingCandidate)
        {
            if (openingCandidate.Opening != null)
            {
                _context.Entry(openingCandidate).State = EntityState.Modified;
            }

            var candidateDocument = candidate.CandidateDocuments.FirstOrDefault();
            if (candidateDocument.CandidateDocumentId != Guid.Empty)
            {
                _context.Entry(candidateDocument).State = EntityState.Modified;
            }

            _context.Entry(candidate).State = EntityState.Modified;
            _context.SaveChanges();

        }

        public Candidates GetByID(Guid candidateId)
        {
            return _context.Candidates.Include(s => s.CandidateDocuments).Include(t => t.Organisation).Include(r => r.Qualification).FirstOrDefault(x => (x.IsActive && !x.IsDeleted) && (x.CandidateId == candidateId));
        }

        public OpeningCandidates GetOpeningCandidate(Guid candidateId)
        {
            return _context.OpeningCandidates.Include(t => t.Opening).FirstOrDefault(x => (x.CandidateId == candidateId) && (x.IsActive && !x.IsDeleted));
        }

        List<CandidateModelDTO> ICandidateRepository.GetAll(SearchAndSortModel searchAndSortModel)
        {

            var candidateList = (from Candidate in _context.Candidates

                                 join OpeningCandidate in _context.OpeningCandidates on Candidate.CandidateId equals OpeningCandidate.CandidateId
                                 join ApprovalTrans in _context.ApprovalTransactions on Candidate.CandidateId equals ApprovalTrans.EntityId
                                 select new CandidateModelDTO
                                 {
                                     FirstName = Candidate.FirstName,
                                     LastName = Candidate.LastName,
                                     Opening = OpeningCandidate.Opening.Title,
                                     Status = ApprovalTrans.ApprovalAction.ApprovalActionName,
                                     CandidateId = Candidate.CandidateId,
                                     ExperienceYear = Candidate.ExperienceYear,
                                     ExperienceMonth = Candidate.ExperienceMonth,
                                     ModifiedDate = OpeningCandidate.ModifiedDate,
                                     IsApproved = Candidate.IsApproved,
                                     IsReadyForInterview = Candidate.IsReadyForInterview,
                                     Documents = Candidate.CandidateDocuments.Count,
                                     CandidateExperienceTotalMonth = (Candidate.ExperienceYear * 12) + Candidate.ExperienceMonth
                                 });

            if (searchAndSortModel.SearchString != null)
            {
                candidateList = candidateList.Where(x => x.FirstName.ToLower().Contains(searchAndSortModel.SearchString.ToLower())
                || x.LastName.ToLower().Contains(searchAndSortModel.SearchString.ToLower())
                || x.Opening.Contains(searchAndSortModel.SearchString.ToLower())
                || x.Status.ToLower().Contains(searchAndSortModel.SearchString.ToLower()));
            }

            if (searchAndSortModel.Property != null)
            {
                if (searchAndSortModel.Direction == 1)
                {
                    candidateList = candidateList.OrderBy(x => x.GetType().GetProperty(searchAndSortModel.Property).GetValue(x, null));
                }
                else
                {
                    candidateList = candidateList.OrderByDescending(x => x.GetType().GetProperty(searchAndSortModel.Property).GetValue(x, null));
                }
            }
            return candidateList.ToList();
        }

        public void AssignUserForCandidate(CandidateAssignedUser candidateAssignedUser)
        {
            _context.CandidateAssignedUser.Add(candidateAssignedUser);
            _context.SaveChanges();
        }

        public List<CandidateAssignedUser> GetAssignedUsersByID(Guid candidateId)
        {
            return _context.CandidateAssignedUser.Where(x => x.CandidateId == candidateId && (x.IsActive && !x.IsDeleted)).ToList();
        }

        public List<CandidateModelDTO> GetCandidatesCorrespondingToLoggedUser(Guid userId, SearchAndSortModel searchAndSortModel)
        {
            var candidatesdto = new List<CandidateModelDTO>();
            var lists = (from scheduleUser in _context.ScheduleUserForCandidate.OrderByDescending(x => x.ApprovalEventId)

                         join _candidate in _context.Candidates on scheduleUser.CandidateId equals _candidate.CandidateId
                         join OpeningCandidate in _context.OpeningCandidates.Include(s => s.Opening) on _candidate.CandidateId equals OpeningCandidate.CandidateId
                         join Approvaltrans in _context.ApprovalTransactions.Include(x => x.ApprovalAction) on scheduleUser.CandidateId equals Approvaltrans.EntityId
                         into FinalValue
                         from CandidateList in FinalValue.DefaultIfEmpty()
                         where scheduleUser.UserId == userId && scheduleUser.IsActive && !scheduleUser.IsDeleted
                         && scheduleUser.CandidateId == _candidate.CandidateId
                         select new { candidate = _candidate, user = scheduleUser, opening = OpeningCandidate, approval = CandidateList }).ToList();
            lists.ForEach(item =>
            {
                var candidateObj = new CandidateModelDTO
                {
                    FirstName = item.candidate.FirstName,
                    LastName = item.candidate.LastName,
                    Opening = item.opening.Opening.Title,
                    CandidateId = item.candidate.CandidateId,
                    ExperienceYear = item.candidate.ExperienceYear,
                    ExperienceMonth = item.candidate.ExperienceMonth,
                    ModifiedDate = item.candidate.ModifiedDate,
                    IsApproved = item.candidate.IsApproved,
                    IsReadyForInterview = item.candidate.IsReadyForInterview,
                    Documents = item.candidate.CandidateDocuments.Count,
                    Status = item.approval != null ? item.approval.ApprovalAction.ApprovalActionName : "Created",
                    CandidateExperienceTotalMonth = (item.candidate.ExperienceYear * 12) + item.candidate.ExperienceMonth,
                    IsFinished = CheckForInterviewCompletion(item.user)
                };
                candidatesdto.Add(candidateObj);
            });
            if (searchAndSortModel.SearchString != null)
            {
                candidatesdto = candidatesdto.Where(x => x.FirstName.ToLower().Contains(searchAndSortModel.SearchString.ToLower())
                || x.LastName.ToLower().Contains(searchAndSortModel.SearchString.ToLower())
                || x.Opening.Contains(searchAndSortModel.SearchString.ToLower())
                || x.Status.ToLower().Contains(searchAndSortModel.SearchString.ToLower())).ToList();
            }
            if (searchAndSortModel.Property != null)
            {
                if (searchAndSortModel.Direction == 1)
                {
                    candidatesdto = candidatesdto.OrderBy(x => x.GetType().GetProperty(searchAndSortModel.Property).GetValue(x, null)).ToList();
                }
                else
                {
                    candidatesdto = candidatesdto.OrderByDescending(x => x.GetType().GetProperty(searchAndSortModel.Property).GetValue(x, null)).ToList();
                }
            }
            return candidatesdto.ToList().GroupBy(xx => xx.CandidateId).Select(g => g.First()).ToList();
        }

        public void ApprovedForInterview(Candidates candidate)
        {
            _context.Entry(candidate).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public List<Organizations> GetOrganizationsOnInputChanged(string input)
        {
            return _context.Organizations.Where(x => x.Name.Substring(0, input.Length).Equals(input) && (x.IsActive && !x.IsDeleted)).ToList();
        }

        public void AddScheduledUsers(ScheduleUserForCandidate scheduleUser)
        {
            _context.ScheduleUserForCandidate.Add(scheduleUser);
        }

        public List<ScheduleUserForCandidate> GetScheduledUserByApprovalEvent(ScheduleUserForCandidate scheduleUser)
        {
            return _context.ScheduleUserForCandidate.Include(t => t.ApprovalEvent).Include(s => s.User).Where(x => x.CandidateId == scheduleUser.CandidateId && x.ApprovalEventId == scheduleUser.ApprovalEventId && (x.IsActive && !x.IsDeleted)).ToList();
        }

        public List<ScheduleUserForCandidate> GetScheduledUsersById(Guid candidateId)
        {
            return _context.ScheduleUserForCandidate.Include(t => t.ApprovalEvent).Include(s => s.User).Where(x => x.CandidateId == candidateId && (x.IsActive && !x.IsDeleted)).ToList();
        }

        public void OnInterviewFinished(ApprovalTransactions approvalTransaction, Guid userId)
        {
            _context.ScheduleUserForCandidate.FirstOrDefault(x => x.CandidateId == approvalTransaction.EntityId && x.ApprovalEvent.ApprovalEventOrder == approvalTransaction.EventOrderNumber && x.UserId == userId && (x.IsActive && !x.IsDeleted)).IsFinished = true;
            _context.SaveChanges();
        }

        public void OnCandidateApproved(ApprovalTransactions approvalTransaction)
        {
            _context.Candidates.FirstOrDefault(x => x.CandidateId == approvalTransaction.EntityId && (x.IsActive && !x.IsDeleted)).IsApproved = true;
            _context.SaveChanges();
        }

        public bool CheckForInterviewCompletion(ScheduleUserForCandidate scheduleUserForCandidate)
        {
            var interviewCompleted = _context.ScheduleUserForCandidate.Where(x => x.ApprovalEventId == scheduleUserForCandidate.ApprovalEventId && x.CandidateId == scheduleUserForCandidate.CandidateId && x.IsFinished && (x.IsActive && !x.IsDeleted)).ToList();
            if (interviewCompleted.Any())
            {
                return true;
            }
            return false;
        }
    }
}