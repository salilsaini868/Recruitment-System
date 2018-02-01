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
        private readonly ClaimsPrincipal _principal;
        public CandidateRepository(IPrincipal principal, RSContext context) : base(context)
        {
            this._principal = principal as ClaimsPrincipal;
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

        public void UpdateCandidate(CandidateViewModel candidate)
        {
            var candidateModel = _context.Candidates.Include(t => t.Organisation).FirstOrDefault(x => (x.IsActive && !x.IsDeleted) && (x.CandidateId == candidate.CandidateId));
            candidateModel.MapFromViewModel(candidate, (ClaimsIdentity)_principal.Identity);
            candidateModel.QualificationId = candidate.Qualification;

            var organizationModel = GetOrganization(candidate.Organization);
            if (organizationModel != null)
            {
                candidateModel.OrganizationId = organizationModel.OrganizationId;
            }

            var organization = new Organizations();
            organization.Name = candidate.Organization;
            organization.MapAuditColumns((ClaimsIdentity)_principal.Identity);

            var openingCandidate = GetOpeningCandidate(candidate.CandidateId);
            var updatedOpeningCandidate = new OpeningCandidates();
            if ((openingCandidate != null) && (openingCandidate.Opening.OpeningId != candidate.Opening))
            {
                openingCandidate.MapDeleteColumns((ClaimsIdentity)_principal.Identity);
                updatedOpeningCandidate.CandidateId = candidateModel.CandidateId;
                updatedOpeningCandidate.OpeningId = candidate.Opening;
                updatedOpeningCandidate.MapAuditColumns((ClaimsIdentity)_principal.Identity);
            }
            if (!organization.Name.Equals(candidateModel.Organisation.Name))
            {
                var org = _context.Organizations.FirstOrDefault(x => (x.Name.ToLower() == organization.Name.ToLower()) && (x.IsActive && !x.IsDeleted));
                if (org == null)
                {
                    candidateModel.Organisation = organization;
                }
                else
                {
                    candidateModel.OrganizationId = organizationModel.OrganizationId;
                }
            }

            if (updatedOpeningCandidate.OpeningId != null)
            {
                _context.OpeningCandidates.Add(updatedOpeningCandidate);
            }

            _context.Entry(candidateModel).State = EntityState.Modified;
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
    }
}
