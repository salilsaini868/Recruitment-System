using System;
using System.Collections.Generic;
using System.Text;
using RS.Common.CommonData;

namespace RS.Service.Interfaces
{
    public interface IApprovalManagerService
    {
        IResult GetApprovalEvents(int approvalId);
    }
}
