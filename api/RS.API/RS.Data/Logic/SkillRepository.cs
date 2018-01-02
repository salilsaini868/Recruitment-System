using Microsoft.EntityFrameworkCore;
using RS.Data.Interfaces;
using RS.Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RS.Data.Logic
{
    class SkillRepository : Repository<Skills>, ISkillRepository
    {
        private readonly RSContext _context;
        public SkillRepository(RSContext context) : base(context)
        {

            this._context = context;
        }

        public dynamic CreateSkill(Skills skill)
        {
            _context.Skills.Add(skill);
            return _context.SaveChanges();
        }

        public dynamic DeleteSkill(int id)
        {
            throw new NotImplementedException();
        }

        public dynamic UpdateSkill(Skills skill)
        {
            _context.Entry(skill).State = EntityState.Modified;
            return _context.SaveChanges();
        }
    }
}
