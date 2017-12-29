using RS.Data;
using RS.Data.Interfaces;
using RS.Entity.Models;

namespace RS.Data.Logic
{
    public class OpeningRepository : Repository<Openings>, IOpeningRepository
    {
        private readonly RSContext _context;
        public OpeningRepository(RSContext context) : base(context)
        {

            this._context = context;
        }
    }
}
