using RS.Data.Interfaces;
using RS.Entity.Models;
using System.Linq;
using System.Collections.Generic;
using RS.ViewModel.Skill;
using System;
using RS.ViewModel.SearchAndSortModel;
using RS.Common.Extensions;

namespace RS.Data.Logic
{
    public class SkillRepository : Repository<Skills>, ISkillRepository
    {
        private readonly RSContext _context;

        public SkillRepository(RSContext context) : base(context) {

            this._context = context;
        }

        List<SkillViewModel> ISkillRepository.GetAll(SearchAndSortModel searchAndSortModel)
        {

            List<SkillViewModel> skillModelList = new List<SkillViewModel>();
            var GetAll = _context.Skills.Where(x => (x.IsActive && !x.IsDeleted)).ToList();
           
            var skillLists = skillModelList.MapFromModel<Skills, SkillViewModel>(GetAll);
            List<SkillViewModel> skillOrderList = new List<SkillViewModel>();
            List<SkillViewModel> skillSearchSort = new List<SkillViewModel>();

            if (searchAndSortModel.Property != null)
            {
                if (searchAndSortModel.Direction == 1)
                {
                    skillOrderList = skillLists.OrderBy(x => x.GetType().GetProperty(searchAndSortModel.Property).GetValue(x, null)).ToList();
                }
                else
                {
                    skillOrderList = skillLists.OrderByDescending(x => x.GetType().GetProperty(searchAndSortModel.Property).GetValue(x, null)).ToList();
                }
            }

            else
            {
                skillOrderList = skillLists;
            }
            skillSearchSort = skillOrderList;
            if (searchAndSortModel.SearchString != null)
            {
                skillSearchSort = skillOrderList.Where(x => x.Name.ToLower().Contains(searchAndSortModel.SearchString.ToLower())).ToList();
            }
            
             
                return skillSearchSort;
            
        }
    }
}
