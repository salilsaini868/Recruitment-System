using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RS.Service.Interfaces;
using RS.ViewModel.Skill;

namespace RS.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Skill")]
    public class SkillController : Controller
    {
        private readonly ISkillService _skillService;
        public SkillController(ISkillService skillService)
        {
            this._skillService = skillService;
        }

        [HttpPost]
        public dynamic CreateSkill([FromBody]SkillViewModel skillView)
        {
            return _skillService.CreateSkill(skillView);
        }

        [HttpPut]
        public dynamic UpdateSkill([FromBody]SkillViewModel skillView)
        {
            return _skillService.UpdateSkill(skillView);
        }
    }
}