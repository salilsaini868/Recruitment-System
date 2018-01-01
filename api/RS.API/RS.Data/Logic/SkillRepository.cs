using RS.Data.Interfaces;
using RS.Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RS.Data.Logic
{
    public class SkillRepository : Repository<Skills>, ISkillRepository
    {
        private readonly RSContext _context;
        public SkillRepository(RSContext context) : base(context) {

            this._context = context;
        }

        public int createSkill(Skills skill)
        {
            throw new NotImplementedException();
        }
    }
}
