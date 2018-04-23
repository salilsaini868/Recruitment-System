using RS.Entity.Models;
using System;
using System.Collections.Generic;

namespace RS.Data.Interfaces
{
    public interface ICandidateRepository : IRepository<Candidates>
    {
        void AddCandidate(Candidates candidate, OpeningCandidates openingCandidate);

        void UpdateCandidate(Candidates candidate, OpeningCandidates openingCandidate);

        new List<Candidates> GetAll();

        OpeningCandidates GetOpeningCandidate(Guid candidateId);

        Candidates GetByID(Guid candidateId);

        void AssignUserForCandidate(CandidateAssignedUser candidateAssignedUser);

        List<CandidateAssignedUser> GetAssignedUsersByID(Guid candidateId);

        List<Candidates> GetCandidatesCorrespondingToLoggedUser(Guid userId);

        void ApprovedForInterview(Candidates candidate);

        List<Organizations> GetOrganizationsOnInputChanged(string input);
    }
}
