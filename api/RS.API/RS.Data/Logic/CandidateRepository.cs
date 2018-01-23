using RS.Data;
using RS.Data.Interfaces;
using RS.Entity.Models;

namespace RS.Data.Logic
{
    public class CandidateRepository : Repository<Candidates>, ICandidateRepository
    {
        private readonly RSContext _context;
        public CandidateRepository(RSContext context) : base(context) {
          
                this._context = context;
        }
    }
}
