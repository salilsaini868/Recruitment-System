using RS.ViewModel.Approval;
using RS.ViewModel.Skill;
using System;
using System.Collections.Generic;
using System.Text;

namespace RS.ViewModel.Opening
{
    public class OpeningViewModel
    {
        public Guid OpeningId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<SkillViewModel> PrimarySkillTypes { get; set; }
        public List<SkillViewModel> SecondarySkillTypes { get; set; }
    }

    public class OpeningAndApprovalViewModel
    {
        public OpeningViewModel openingViewModel { get; set; }
        public ApprovalTransactionViewModel approvalTransactionViewModel { get; set; }
    }
}
