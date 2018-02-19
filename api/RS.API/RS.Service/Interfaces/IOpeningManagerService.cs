using RS.Common.CommonData;
using RS.ViewModel.Approval;
using RS.ViewModel.Opening;
using System;
using System.Collections.Generic;
using System.Text;

namespace RS.Service.Interfaces
{
    public interface IOpeningManagerService
    {
        /// <summary>
        /// Create a Opening
        /// </summary>
        /// <param name="opening"></param>
        /// <returns></returns>
        IResult CreateOpening(OpeningViewModel opening, ApprovalTransactionViewModel approvalTransactionViewModel);

        /// <summary>
        /// Update a Opening
        /// </summary>
        /// <param name="opening"></param>
        /// <returns></returns>
        IResult UpdateOpening(OpeningViewModel opening, ApprovalTransactionViewModel approvalTransactionViewModel);

        /// <summary>
        /// Delete a Opening
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        IResult DeleteOpening(Guid id);

        /// <summary>
        /// Get All Openings
        /// </summary>
        /// <returns></returns>
        IResult GetAllOpenings();

        /// <summary>
        /// Get Opening By id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        IResult GetOpeningById(Guid id);
    }
}
