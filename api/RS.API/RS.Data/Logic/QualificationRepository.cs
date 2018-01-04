using RS.Data.Interfaces;
using RS.Entity.Models;
using System;
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
    }
}
