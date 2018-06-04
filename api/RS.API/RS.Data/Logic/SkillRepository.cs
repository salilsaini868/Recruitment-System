﻿using RS.Data.Interfaces;
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

        List<Skills> ISkillRepository.GetAll(SearchAndSortModel searchAndSortModel)
        {

            List<SkillViewModel> skillModelList = new List<SkillViewModel>();
            var skillList = _context.Skills.Where(x => (x.IsActive && !x.IsDeleted)).ToList();
           
          //  var skillViewModelLists = skillModelList.MapFromModel<Skills, SkillViewModel>(skillList);
           
            if (searchAndSortModel.Property != null)
            {
                if (searchAndSortModel.Direction == 1)
                {
                    skillList = skillList.OrderBy(x => x.GetType().GetProperty(searchAndSortModel.Property).GetValue(x, null)).ToList();
                }
                else
                {
                    skillList = skillList.OrderByDescending(x => x.GetType().GetProperty(searchAndSortModel.Property).GetValue(x, null)).ToList();
                }
            }

            if (searchAndSortModel.SearchString != null)
            {
                skillList = skillList.Where(x => x.Name.ToLower().Contains(searchAndSortModel.SearchString.ToLower())).ToList();
            }

                return skillList;
            
        }
    }
}
