using RS.Entity.Models;

namespace RS.Data.Interfaces
{
    public interface ISkillRepository : IRepository<Skills>
    {
        dynamic CreateSkill(Skills skill);

        dynamic UpdateSkill(Skills skill);

        dynamic DeleteSkill(int id);
    }
}
