using Microsoft.EntityFrameworkCore;
using RS.Data;
using RS.Data.Interfaces;
using RS.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RS.Data.Logic
{
    public class OpeningRepository : Repository<Openings>, IOpeningRepository
    {
        private readonly RSContext _context;
        public OpeningRepository(RSContext context) : base(context)
        {

            this._context = context;
        }

        public void CreateOpening(Openings opening, List<OpeningSkills> openingSkills)
        {
            opening.OpeningSkills = openingSkills;
            _context.Openings.Add(opening);
            _context.SaveChanges();
        }

        public Openings GetByID(Guid openingId)
        {
            return _context.Openings.Include(t => t.OpeningSkills).ThenInclude(r => r.Skill).FirstOrDefault(x => (x.IsActive && !x.IsDeleted) && (x.OpeningId == openingId));
        }

        public void UpdateOpeningSkills(List<OpeningSkills> openingSkills)
        {
            openingSkills.ForEach(x => _context.OpeningSkills.Add(x));
        }

        List<Openings> IOpeningRepository.GetAll()
        {
            return _context.Openings.Include(t => t.OpeningSkills).ThenInclude(r => r.Skill).Where(x => (x.IsActive && !x.IsDeleted)).ToList();
        }
    }
}
