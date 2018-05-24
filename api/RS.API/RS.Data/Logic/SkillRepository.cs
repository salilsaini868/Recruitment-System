using RS.Data.Interfaces;
using RS.Entity.Models;
using System.Linq;
using System.Collections.Generic;

namespace RS.Data.Logic
{
    public class SkillRepository : Repository<Skills>, ISkillRepository
    {
        private readonly RSContext _context;
        public SkillRepository(RSContext context) : base(context) {

            this._context = context;
        }
        List<Skills> ISkillRepository.GetAll()
        {
            return _context.Skills.Where(x => (x.IsActive && !x.IsDeleted)).ToList();
        }
    }
}
