using RS.Entity.Models;
using RS.ViewModel.Candidate;
using System;
using System.Collections.Generic;

namespace RS.Data.Interfaces
{
    public interface ICandidateRepository : IRepository<Candidates>
    {
        void AddCandidate(Candidates candidate, OpeningCandidates openingCandidate, Organizations organization);

        void UpdateCandidate(Candidates candidate, OpeningCandidates openingCandidate, Organizations organization);

        new List<Candidates> GetAll();

        OpeningCandidates GetOpeningCandidate(Guid candidateId);

        Candidates GetByID(Guid candidateId);

        Organizations GetOrganization(String organization);
    }
}
