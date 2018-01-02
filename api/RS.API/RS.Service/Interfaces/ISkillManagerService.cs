using RS.ViewModel.Skill;
using System;
using System.Collections.Generic;
using System.Text;

namespace RS.Service.Interfaces
{
    public interface ISkillService
    {
        dynamic CreateSkill(SkillViewModel skill);

        dynamic UpdateSkill(SkillViewModel skill);

        dynamic DeleteSkill(int id);

    }
}
