using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using RS.Data;
using RS.Data.Interfaces;
using RS.Entity.Models;
using RS.ViewModel.User;

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
    }
}
