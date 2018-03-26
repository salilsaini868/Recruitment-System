using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using RS.Data;
using RS.Data.Interfaces;
using RS.Entity.Models;
using RS.ViewModel.Approval;
using RS.ViewModel.User;
using RS.Common.Enums;

namespace RS.Data.Logic
{
    public class ApprovalRepository : Repository<Approvals>, IApprovalRepository
    {
        private readonly RSContext _context;
        public ApprovalRepository(RSContext context) : base(context)
        {

            _context = context;
        }

        public List<ApprovalEvents> GetApprovalEvents(int approvalId)
        {
            return _context.ApprovalEvents.Include(t => t.ApprovalActions)
                .Where(t => t.Approval.ApprovalId == approvalId)
                .OrderBy(t => t.ApprovalEventOrder).ToList();
        }

        public void AddApprovalEventRole(ApprovalEventRoles approvalEventRole)
        {
            _context.ApprovalEventRoles.Add(approvalEventRole);
        }

        public List<ApprovalEventRoles> GetAllApprovalEventRole()
        {
            return _context.ApprovalEventRoles.Include(t => t.ApprovalEvent).Include(s => s.Role).Include(r => r.User)
                .Where(x => x.IsActive && !x.IsDeleted).ToList();
        }

        public List<Approvals> GetAllApprovals()
        {
            return _context.Approvals.ToList();
        }

        public Dictionary<string, string> GetApprovalEventsOfUser(Guid UserId)
        {
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            var events = _context.ApprovalEventRoles.Where(x => x.UserId == UserId && x.IsActive && !x.IsDeleted).ToList();

            var approvalEvents = events.Distinct().Select(t => t.ApprovalEventId).ToList();
            approvalEvents.ForEach(x =>
            {
                string approvalName = _context.ApprovalEvents.Include(s => s.Approval).FirstOrDefault(t => t.ApprovalEventId == x).Approval.ApprovalName;
                string eventIds = string.Join(",", x);
                dictionary.Add(approvalName, eventIds);
            });
            return dictionary;
        }

        public int GetApprovalEventOrderNumber(ApprovalEventViewModel approvalEventViewModel)
        {
            return _context.ApprovalEvents.FirstOrDefault(x => (x.ApprovalEventName == approvalEventViewModel.ApprovalEventName) && (x.ApprovalId == approvalEventViewModel.ApprovalId)).ApprovalEventOrder;
        }

        public void CreateApprovalTransaction(ApprovalTransactions approvalTransaction)
        {
            _context.ApprovalTransactions.Add(approvalTransaction);
            _context.SaveChanges();
        }

        public ApprovalTransactions GetApprovalTransactionByEntity(Guid entityId)
        {
            return _context.ApprovalTransactions.FirstOrDefault(x => x.EntityId == entityId && x.IsActive && !x.IsDeleted);
        }

        public void UpdateApprovalTransaction(ApprovalTransactions approvalTransaction, ApprovalTransactionDetails approvalTransactionDetail)
        {
            _context.ApprovalTransactionDetails.Add(approvalTransactionDetail);
            _context.Entry(approvalTransaction).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void AddApprovalTransactionDetails(ApprovalTransactionDetails approvalTransactionDetail)
        {
            _context.ApprovalTransactionDetails.Add(approvalTransactionDetail);
            _context.SaveChanges();
        }

        public List<Users> GetApprovedUsersByRole(int roleId, int approvalEventId)
        {
            return _context.ApprovalEventRoles.Include(t => t.User).Where(x => x.ApprovalEventId == approvalEventId
             && x.RoleId == roleId && x.IsActive && !x.IsDeleted).Select(x => x.User).ToList();
        }

        public List<Users> GetApprovedUsers(int approvalEventId)
        {
            return _context.ApprovalEventRoles.Where(x => x.ApprovalEventId == approvalEventId
             && x.IsActive && !x.IsDeleted).Select(x => x.User).ToList();
        }

        public List<ApprovalTransactions> GetAllApprovalTransactions(List<Guid> openingIds)
        {
            return _context.ApprovalTransactions.Include(t => t.ApprovalAction).Where(x => openingIds.Contains(x.EntityId) && (x.IsActive && !x.IsDeleted)).ToList();
        }

        public int GetApprovalEventOfUser(Guid entityId, Guid userId, int approvalId)
        {
            if (approvalId == (int)Approval.Opening)
            {
                var assignedUser = _context.ApprovalEventRoles.Include(x => x.ApprovalEvent).FirstOrDefault(x => x.UserId == userId && x.IsActive && !x.IsDeleted);
                return assignedUser.ApprovalEvent.ApprovalEventOrder;
            }
            else
            {
                var assignedUser = _context.CandidateAssignedUser.Include(x => x.ApprovalEvent).FirstOrDefault(x => x.UserId == userId && x.CandidateId == entityId && x.IsActive && !x.IsDeleted);
                return assignedUser.ApprovalEvent.ApprovalEventOrder;
            }    
        }
    }
}
