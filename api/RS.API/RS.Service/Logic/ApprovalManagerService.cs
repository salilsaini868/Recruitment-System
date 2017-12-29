using RS.Service.Interfaces;
using RS.Common.Enums;
using RS.Entity;
using RS.ViewModel.User;
using System;
using RS.Data.Interfaces;

namespace RS.Service.Logic
{
    public class ApprovalManagerService : IApprovalManagerService
    {
        #region Global Variables
        private readonly IApprovalRepository _approvalRepository;
        #endregion
        public ApprovalManagerService(IApprovalRepository approvalRepository)
        {
            _approvalRepository = approvalRepository;
        }


    }
}
