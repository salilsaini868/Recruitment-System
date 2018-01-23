using RS.Service.Interfaces;
using RS.Common.Enums;
using RS.Entity;
using RS.ViewModel.User;
using System;
using System.Collections.Generic;
using System.Linq;
using RS.Common.CommonData;
using RS.Common.Extensions;
using RS.Data.Interfaces;
using RS.Entity.Models;
using RS.ViewModel.Approval;

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

        public IResult GetApprovalEvents(int approvalId)
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var data = _approvalRepository.GetApprovalEvents(approvalId);
                if (data.Any())
                {
                    result.Body = data.Select(t =>
                    {
                        var eventViewModel = new ApprovalEventViewModel();
                        eventViewModel.MapFromModel(t);
                        if (t.ApprovalActions.Any())
                        {
                            var actionViewModel = new List<ApprovalActionViewModel>();
                            eventViewModel.ApprovalActions = actionViewModel
                                    .MapFromModel<ApprovalActions, ApprovalActionViewModel>(t.ApprovalActions.ToList());
                        }
                        return eventViewModel;
                    }).ToList();
                }
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }

    }
}
