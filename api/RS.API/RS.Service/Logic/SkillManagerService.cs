using RS.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using RS.ViewModel.Skill;
using RS.Data.Logic;
using RS.Data.Interfaces;
using RS.Entity.Models;

namespace RS.Service.Logic
{
    public class SkillManagerService : ISkillService
    {
        private readonly ISkillRepository _skillRepository;
        public SkillManagerService(SkillRepository skillRepository)
        {
            this._skillRepository = skillRepository;
        }

        public dynamic CreateSkill(SkillViewModel skill)
        {
            Skills skillmodel = new Skills()
            {
                SkillId = skill.SkillId,
                SkillName = skill.SkillName,
                SkillDescription = skill.SkillDescription
            };
            return _skillRepository.CreateSkill(skillmodel);
        }

        public dynamic DeleteSkill(int id)
        {
            throw new NotImplementedException();
        }

        public dynamic UpdateSkill(SkillViewModel skill)
        {
            Skills skillmodel = new Skills()
            {
                SkillId = skill.SkillId,
                SkillName = skill.SkillName,
                SkillDescription = skill.SkillDescription
            };
            return _skillRepository.UpdateSkill(skillmodel);
        }

    }
}
