using RS.Common.CommonData;
using RS.ViewModel.Candidate;
using System;
using System.Collections.Generic;
using System.Text;

namespace RS.Service.Interfaces
{
    public interface ICandidateManagerService
    {
        /// <summary>
        /// Add Candidate
        /// </summary>
        /// <param name="candidate"></param>
        /// <returns></returns>
        IResult AddCandidate(CandidateViewModel candidate);

        /// <summary>
        /// Update a Candidate Details
        /// </summary>
        /// <param name="candidate"></param>
        /// <returns></returns>
        IResult UpdateCandidate(CandidateViewModel candidate);

        /// <summary>
        /// Delete a Candidate
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        IResult DeleteCandidate(Guid id);

        /// <summary>
        /// Get All Candidate
        /// </summary>
        /// <returns></returns>
        IResult GetAllCandidate();

        /// <summary>
        /// Get Candidate By id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        IResult GetCandidateById(Guid id);

        /// <summary>
        /// Add User Assigned For Candidate
        /// </summary>
        /// <param name="candidateAssignedUserList"></param>
        /// <returns></returns>
        IResult AddUserForCandidate(List<CandidateAssignedUserModel> candidateAssignedUserList);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="candidateId"></param>
        /// <returns></returns>
        IResult GetAssignedUsersById(Guid candidateId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        IResult GetCandidatesCorrespondingToLoggedUser(Guid userId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="candidateId"></param>
        /// <returns></returns>
        IResult ApprovedForInterview(Guid candidateId);

    }
}
