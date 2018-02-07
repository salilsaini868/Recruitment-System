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
using System.Security.Claims;
using System.Security.Principal;

namespace RS.Service.Logic
{
    public class ApprovalManagerService : IApprovalManagerService
    {
        #region Global Variables
        private readonly ClaimsPrincipal _principal;
        private readonly IApprovalRepository _approvalRepository;
        #endregion
        public ApprovalManagerService(IPrincipal principal,IApprovalRepository approvalRepository)
        {
            _principal = principal as ClaimsPrincipal;
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

        public IResult ManageApprovalEventRole(ApprovalEventRoleViewModel approvalEventRoleViewModel)
        {
            var result = new Result
            {
                Operation = Operation.Create,
                Status = Status.Success
            };
            try
            {
                var eventRole = _approvalRepository.GetAllApprovalEventRole().FirstOrDefault(x => x.ApprovalEventId == approvalEventRoleViewModel.ApprovalEventId); ;
                var existingRole = new Roles();
                if (eventRole != null)
                {
                    existingRole = eventRole.Role;
                }
                if(existingRole.RoleId == 0)
                {
                    var users = approvalEventRoleViewModel.Users;
                    foreach (var user in users)
                    {
                        var approvalEventRoleModel = new ApprovalEventRoles();
                        approvalEventRoleModel.MapFromViewModel(approvalEventRoleViewModel, (ClaimsIdentity)_principal.Identity);
                        approvalEventRoleModel.UserId = user.UserId;
                        _approvalRepository.AddApprovalEventRole(approvalEventRoleModel);
                    }
                    result.Body = approvalEventRoleViewModel.ApprovalEventId;
                }
                else
                {
                    if (existingRole.RoleId == approvalEventRoleViewModel.RoleId)
                    {
                        result.Operation = Operation.Update;
                        UpdateApprovalEventRole(approvalEventRoleViewModel);
                        result.Body = approvalEventRoleViewModel.ApprovalEventId;
                    }
                    else
                    {
                        result.Message = "";
                        result.Status = Status.Fail;
                    }
                }
                _approvalRepository.SaveChanges();

            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Error;
            }
            return result;
        }

        void UpdateApprovalEventRole(ApprovalEventRoleViewModel approvalEventRoleViewModel)
        {
            var eventRoleList = _approvalRepository.GetAllApprovalEventRole().Where(x => x.ApprovalEventId == approvalEventRoleViewModel.ApprovalEventId && x.RoleId == approvalEventRoleViewModel.RoleId).ToList();
            var usersList = eventRoleList.Select(x => x.User).ToList();
            var usersViewList = approvalEventRoleViewModel.Users;

            var existingUsers = usersList.Select(x => x.UserId).Intersect(usersViewList.Select(x => x.UserId)).ToList();
            var addingUsers = usersViewList.Select(x => x.UserId).Except(existingUsers).ToList();
            var removingUsers = usersList.Select(x => x.UserId).Except(existingUsers).ToList();

            if (existingUsers.Any())
            {
                var eventRoles = eventRoleList.Where(x => existingUsers.Contains(x.UserId)).ToList();
                eventRoles.ForEach(x => x.MapAuditColumns((ClaimsIdentity)_principal.Identity));
            }

            if(removingUsers.Any())
            {
                var eventRoles = eventRoleList.Where(x => removingUsers.Contains(x.UserId)).ToList();
                eventRoles.ForEach(x => x.MapDeleteColumns((ClaimsIdentity)_principal.Identity));
            }

            if (addingUsers.Any())
            {
                foreach (var user in addingUsers)
                {
                    var approvalEventRoleModel = new ApprovalEventRoles();
                    approvalEventRoleModel.MapFromViewModel(approvalEventRoleViewModel, (ClaimsIdentity)_principal.Identity);
                    approvalEventRoleModel.UserId = user;
                    _approvalRepository.AddApprovalEventRole(approvalEventRoleModel);
                }
            }
        }

        public IResult GetAllApprovalEventRoles()
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var approvalEventRoles = _approvalRepository.GetAllApprovalEventRole().ToList();
                if (approvalEventRoles.Any())
                {
                    result.Body = approvalEventRoles.Select(t =>
                    {
                        var eventRoleViewModel = new ApprovalEventRoleViewModel();
                        eventRoleViewModel.MapFromModel(t);
                        eventRoleViewModel.ApprovalEvent = t.ApprovalEvent.ApprovalEventName;
                        eventRoleViewModel.Role = t.Role.Name;
                        eventRoleViewModel.User = t.User.FirstName + " " + t.User.LastName;
                        return eventRoleViewModel;
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

        public IResult GetAllApprovals()
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                result.Body = _approvalRepository.GetAllApprovals();
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
