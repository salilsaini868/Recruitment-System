using RS.Entity.Models;
using RS.ViewModel.Candidate;
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

        Organizations GetOrganization(String organization);

        void AssignUserForCandidate(CandidateAssignedUser candidateAssignedUser);

        List<CandidateAssignedUser> GetAssignedUsersByID(Guid candidateId);

        List<Candidates> GetCandidatesCorrespondingToLoggedUser(Guid userId);

        void ApprovedForInterview(Candidates candidate);
    }
}
