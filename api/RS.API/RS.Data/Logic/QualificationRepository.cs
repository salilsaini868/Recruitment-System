using Microsoft.EntityFrameworkCore;
using RS.Data.Interfaces;
using RS.Entity.Models;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace RS.Data.Logic
{
    public class QualificationRepository : Repository<Qualifications>, IQualificationRepository
    {
        private readonly RSContext _context;
        public QualificationRepository(RSContext context) : base(context) {

            this._context = context;
        }
        List<Qualifications> IQualificationRepository.GetAll()
        {
            return _context.Qualifications.Where(x => (x.IsActive && !x.IsDeleted)).ToList();
        }
    }
}
