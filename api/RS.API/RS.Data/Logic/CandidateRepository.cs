using Microsoft.EntityFrameworkCore;
using RS.Data;
using RS.Data.Interfaces;
using RS.Entity.Models;
using System.Collections.Generic;
using System.Linq;
using System;
using RS.ViewModel.Candidate;
using RS.Common.Extensions;
using System.Security.Claims;
using System.Security.Principal;

namespace RS.Data.Logic
{
    public class CandidateRepository : Repository<Candidates>, ICandidateRepository
    {
        private readonly RSContext _context;
        public CandidateRepository(RSContext context) : base(context)
        {
            this._context = context;
        }

        public void AddCandidate(Candidates candidate, OpeningCandidates openingCandidate, Organizations organization)
        {

            var organizationModel = _context.Organizations.FirstOrDefault(x => (x.Name.ToLower() == organization.Name.ToLower()) && (x.IsActive && !x.IsDeleted));
            if (organizationModel == null)
            {
                candidate.Organisation = organization;
            }
            else
            {
                candidate.OrganizationId = organizationModel.OrganizationId;
            }
            _context.Candidates.Add(candidate);
            _context.OpeningCandidates.Add(openingCandidate);
            _context.SaveChanges();
        }

        public void UpdateCandidate(Candidates candidate, OpeningCandidates openingCandidate, Organizations organization)
        {
            if (!organization.Name.Equals(candidate.Organisation.Name))
            {
                var organizationModel = _context.Organizations.FirstOrDefault(x => (x.Name.ToLower() == organization.Name.ToLower()) && (x.IsActive && !x.IsDeleted));
                if (organizationModel == null)
                {
                    candidate.Organisation = organization;
                }
                else
                {
                    candidate.OrganizationId = organizationModel.OrganizationId;
                }
            }

            if (openingCandidate.Opening != null)
            {
                _context.OpeningCandidates.Add(openingCandidate);
            }

            _context.Entry(candidate).State = EntityState.Modified;
            _context.SaveChanges();

        }

        public Candidates GetByID(Guid candidateId)
        {
            return _context.Candidates.Include(t => t.Organisation).Include(r => r.Qualification).FirstOrDefault(x => (x.IsActive && !x.IsDeleted) && (x.CandidateId == candidateId));
        }

        public OpeningCandidates GetOpeningCandidate(Guid candidateId)
        {
            return _context.OpeningCandidates.Include(t => t.Opening).FirstOrDefault(x => (x.CandidateId == candidateId) && (x.IsActive && !x.IsDeleted));
        }

        List<Candidates> ICandidateRepository.GetAll()
        {
            return _context.Candidates.Include(t => t.Organisation).Where(x => (x.IsActive && !x.IsDeleted)).ToList();
        }

        public Organizations GetOrganization(string organization)
        {
            return _context.Organizations.FirstOrDefault(x => x.Name == organization && (x.IsActive && !x.IsDeleted));
        }

        public void AddUserForCandidate(CandidateAssignedUser candidateAssignedUser)
        {
            _context.CandidateAssignedUser.Add(candidateAssignedUser);
            _context.SaveChanges();
        }

        public List<CandidateAssignedUser> GetAssignedUsersByID(Guid candidateId)
        {
           return _context.CandidateAssignedUser.Where(x => x.CandidateId == candidateId && (x.IsActive && !x.IsDeleted)).ToList();
        }

        public List<Candidates> GetCandidatesCorrespondingToLoggedUser(Guid userId)
        {
            List<Guid> candidateList = _context.CandidateAssignedUser.Where(x => x.UserId == userId && (x.IsActive && !x.IsDeleted)).Select(x => x.CandidateId).ToList();
            return _context.Candidates.Where(x => candidateList.Contains(x.CandidateId) && (x.IsActive && !x.IsDeleted)).ToList();
        }
    }
}
