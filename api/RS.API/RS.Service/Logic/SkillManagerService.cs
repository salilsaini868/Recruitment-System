using RS.Common.Extensions;
using RS.Data.Interfaces;
using RS.Entity.Models;
using RS.Service.Interfaces;
using RS.ViewModel.Skill;
using System;
using System.Collections.Generic;
using System.Text;

namespace RS.Service.Logic
{
    class SkillManagerService : ISkillService
    {
        private readonly ISkillRepository _skillRepository;
        public SkillManagerService(ISkillRepository skillRepository)
        {
            this._skillRepository = skillRepository;
        }

        public dynamic CreateSkill(SkillViewModel skill)
        {
            var skillModel = new Skills();
            skillModel.MapFromViewModel(skill);
            return _skillRepository.CreateSkill(skillModel);
        }

        public dynamic DeleteSkill(int id)
        {
            throw new NotImplementedException();
        }

        public dynamic UpdateSkill(SkillViewModel skill)
        {
            Skills skillModel = new Skills();
            skillModel.MapFromViewModel(skill);
            return _skillRepository.UpdateSkill(skillModel);
        }

    }
}
