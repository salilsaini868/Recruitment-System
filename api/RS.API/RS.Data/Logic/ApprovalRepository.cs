using RS.Data;
using RS.Data.Interfaces;
using RS.Entity.Models;

namespace RS.Data.Logic
{
    public class ApprovalRepository : Repository<Approvals>, IApprovalRepository
    {
        private readonly RSContext _context;
        public ApprovalRepository(RSContext context) : base(context) {
          
                this._context = context;
        }
    }
}
