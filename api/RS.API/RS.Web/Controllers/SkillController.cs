using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RS.Service.Interfaces;
using RS.ViewModel.Skill;
using RS.Common.CommonData;
using RS.ViewModel.SearchAndSortModel;
namespace RS.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Skill/[Action]")]
    [ValidateModel]
    [Authorize]
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
            var updatedSkill = _skillService.UpdateSkill(skillView);
            return updatedSkill;
        }

        [HttpPut]
        public IResult DeleteSkill([FromBody]SkillViewModel skillView)
        {
            var deleteQualification = _skillService.DeleteSkill(skillView);
            return deleteQualification;
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

        [HttpPost]
        public IResult GetSkillsResults([FromBody]SearchAndSortModel searchAndSortModel)
        {
            var skillList = _skillService.GetSkillsResults(searchAndSortModel);
            return skillList;
        }
    }
}