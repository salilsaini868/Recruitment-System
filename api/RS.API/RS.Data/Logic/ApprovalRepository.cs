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

        public List<ApprovalEvents> GetAllApprovalEvents()
        {
            return _context.ApprovalEvents.Include(t => t.ApprovalActions)
                .OrderBy(t => t.ApprovalEventOrder).ToList();
        }

        public void ManageApprovalEventRole(ApprovalEventRoles approvalEventRole)
        {
            _context.ApprovalEventRoles.Add(approvalEventRole);
        }

        public List<ApprovalEventRoles> GetAllApprovalEventRole()
        {
            return _context.ApprovalEventRoles.Include(t => t.ApprovalEvent).Include(s => s.Role).Include(r => r.User)
                .Where(x => x.IsActive && !x.IsDeleted).ToList();
        }

        public void UpdateUserEventRole(List<ApprovalEventRoles> approvalEventRoles)
        {
            approvalEventRoles.ForEach(x =>
                _context.Entry(x).State = EntityState.Modified
            );
        }
    }
}
