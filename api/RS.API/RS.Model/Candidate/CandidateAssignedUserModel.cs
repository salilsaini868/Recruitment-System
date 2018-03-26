using RS.Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RS.ViewModel.Candidate
{
    public class CandidateAssignedUserModel
    {
        public int CandidateAssignedUserId { get; set; }
        public int ApprovalEventId { get; set; }
        public Guid CandidateId { get; set; }

        public ApprovalEvents ApprovalEvent { get; set; }
        public Candidates Candidate { get; set; }

        public Guid UserId { get; set; }
        public Users User { get; set; }
    }
}
