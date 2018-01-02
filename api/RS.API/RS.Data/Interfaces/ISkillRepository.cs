using RS.Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RS.Data.Interfaces
{
    public interface ISkillRepository : IRepository<Skills>
    {
        dynamic CreateSkill(Skills skill);

        dynamic UpdateSkill(Skills skill);

        dynamic DeleteSkill(int id);

    }
}
