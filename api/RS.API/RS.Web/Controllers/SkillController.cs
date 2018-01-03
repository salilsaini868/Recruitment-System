using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RS.Service.Interfaces;
using RS.ViewModel.Skill;
using RS.Common.CommonData;

namespace RS.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Skill/[Action]")]
    [ValidateModel]
    public class SkillController : Controller
    {
        private readonly ISkillManagerService _skillService;
        public SkillController(ISkillManagerService skillService)
        {
            this._skillService = skillService;
        }

        [HttpPost]
        public IResult CreateSkill([FromBody]SkillViewModel skillView)
        {
            var createdSkill = _skillService.CreateSkill(skillView);
            return createdSkill;
        }

        [HttpPut]
        public IResult UpdateSkill([FromBody]SkillViewModel skillView)
        {
            var updatedSkill  = _skillService.UpdateSkill(skillView);
            return updatedSkill;
        }

        [HttpGet]
        public IResult GetAllSkill()
        {
            var skillList = _skillService.GetAllSkill();
            return skillList;
        }

        [HttpGet]
        public IResult GetSkillById(int id)
        {
            var skillRecord = _skillService.GetSkillById(id);
            return skillRecord;
        }
    }
}