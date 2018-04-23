using Microsoft.EntityFrameworkCore;
using RS.Data;
using RS.Data.Interfaces;
using RS.Entity.Models;
using System.Collections.Generic;
using System.Linq;
using System;

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

        List<Candidates> ICandidateRepository.GetAll()
        {
            return _context.Candidates.Include(t => t.Organisation).Include(s => s.CandidateDocuments).Where(x => (x.IsActive && !x.IsDeleted)).ToList();
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

        public List<Candidates> GetCandidatesCorrespondingToLoggedUser(Guid userId)
        {
            List<Guid> candidateList = _context.CandidateAssignedUser.Where(x => x.UserId == userId && (x.IsActive && !x.IsDeleted)).Select(x => x.CandidateId).ToList();
            return _context.Candidates.Where(x => candidateList.Contains(x.CandidateId) && x.IsReadyForInterview && (x.IsActive && !x.IsDeleted)).ToList();
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
    }
}
