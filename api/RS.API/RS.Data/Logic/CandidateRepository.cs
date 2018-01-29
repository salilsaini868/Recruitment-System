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

        public void AddCandidate(Candidates candidate, OpeningCandidates openingCandidate, Organizations organization)
        {

            var organizationModel = _context.Organizations.FirstOrDefault(x => x.Name.ToLower() == organization.Name.ToLower());
            if (organizationModel == null)
            {
                _context.Organizations.Add(organization);
                _context.SaveChanges();
                candidate.OrganizationId = organization.OrganizationId;
            }
            else
            {
                candidate.OrganizationId = organizationModel.OrganizationId;
            }
            candidate.Organisation = organization;
            _context.Candidates.Add(candidate);
            _context.OpeningCandidates.Add(openingCandidate);
        }

        public void UpdateCandidate(Candidates candidate, OpeningCandidates openingCandidate, Organizations organization)
        {

            var organizationModel = _context.Organizations.FirstOrDefault(x => x.Name.ToLower() == organization.Name.ToLower());
            if (organizationModel == null)
            {

                _context.Organizations.Add(organization);
                _context.SaveChanges();
                candidate.OrganizationId = organization.OrganizationId;
            }
            else
            {
                candidate.OrganizationId = organizationModel.OrganizationId;
            }
            candidate.Organisation = organization;
            if (openingCandidate.Opening != null)
            {
                _context.OpeningCandidates.Add(openingCandidate);
            }
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

    }
}
