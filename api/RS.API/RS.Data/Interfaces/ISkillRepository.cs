using RS.Entity.Models;

namespace RS.Data.Interfaces
{
    interface ISkillRepository : IRepository<Skills>
    {
        int createSkill(Skills skill);
    }
}
