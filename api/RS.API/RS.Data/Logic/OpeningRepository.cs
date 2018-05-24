using Microsoft.EntityFrameworkCore;
using RS.Common.Enums;
using RS.Common.Extensions;
using RS.Data;
using RS.Data.Interfaces;
using RS.Entity.Models;
using RS.ViewModel.Opening;
using RS.ViewModel.Skill;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RS.Data.Logic
{
    public class OpeningRepository : Repository<Openings>, IOpeningRepository
    {
        private readonly RSContext _context;
        public OpeningRepository(RSContext context) : base(context)
        {
            this._context = context;
        }

        public void CreateOpening(Openings opening, List<OpeningSkills> openingSkills)
        {
            opening.OpeningSkills = openingSkills;
            _context.Openings.Add(opening);
            _context.SaveChanges();
        }

        public Openings GetByID(Guid openingId)
        {
            return _context.Openings.Include(t => t.OpeningSkills).ThenInclude(r => r.Skill).FirstOrDefault(x => (x.IsActive && !x.IsDeleted) && (x.OpeningId == openingId));
        }

        public List<OpeningViewModel> GetOpeningsCorrespondingToLoggedUser(Guid userId)
        {
            var openings = new List<OpeningViewModel>();
            var eventRole = _context.ApprovalEventRoles.Include(x => x.ApprovalEvent).FirstOrDefault(x => x.UserId == userId);
            if (eventRole != null && eventRole.ApprovalEvent.ApprovalId == (int)Approval.Opening)
            {
                openings = (from Opening in _context.Openings.Include(s => s.OpeningSkills).ThenInclude(r => r.Skill)

                            join ApprovalTransaction in _context.ApprovalTransactions.Include(t => t.ApprovalAction) on Opening.OpeningId equals ApprovalTransaction.EntityId

                            where (Opening.IsActive && !Opening.IsDeleted)
                            where (ApprovalTransaction.IsActive && !ApprovalTransaction.IsDeleted)


                            select new OpeningViewModel
                            {
                                OpeningId = Opening.OpeningId,
                                Title = Opening.Title,
                                Description = Opening.Description,
                                IsApproved = ApprovalTransaction.IsApproved,
                                CreatedDate = Opening.CreatedDate,
                                ModifiedDate = Opening.ModifiedDate,
                                Status = ApprovalTransaction.ApprovalAction.ApprovalActionName,
                                PrimarySkills = GetCorrespondingSkills(Opening.OpeningSkills.ToList(), OpeningSkillType.Primary),
                                SecondarySkills = GetCorrespondingSkills(Opening.OpeningSkills.ToList(), OpeningSkillType.Secondary),
                                PrimarySkillTypes = GetCorrespondingSkillTypes(Opening.OpeningSkills.ToList(), OpeningSkillType.Primary),
                                SecondarySkillTypes = GetCorrespondingSkillTypes(Opening.OpeningSkills.ToList(), OpeningSkillType.Secondary)
                            }).ToList();
            }
            return openings;
        }

        private string GetCorrespondingSkills(List<OpeningSkills> openingSkills, OpeningSkillType skillType)
        {
            var skillList = openingSkills.Where(x => x.SkillType == skillType && (x.IsActive && !x.IsDeleted)).Select(x => x.Skill).ToList();
            return string.Join(",", skillList.Select(x => x.Name).ToList());
        }

        private List<SkillViewModel> GetCorrespondingSkillTypes(List<OpeningSkills> openingSkills, OpeningSkillType skillType)
        {
            var skillList = openingSkills.Where(x => x.SkillType == skillType && (x.IsActive && !x.IsDeleted)).Select(x => x.Skill).ToList();
            var skills = new List<SkillViewModel>();
            if (skillList.Any())
            {
                foreach (var skill in skillList)
                {
                    var skillViewModel = new SkillViewModel();
                    skillViewModel.MapFromModel(skill);
                    skillViewModel.OpeningSkillType = OpeningSkillType.Primary;
                    skills.Add(skillViewModel);
                }
            }
            return skills;
        }

        public void UpdateOpeningSkills(List<OpeningSkills> openingSkills)
        {
            openingSkills.ForEach(x => _context.OpeningSkills.Add(x));
        }

        List<Openings> IOpeningRepository.GetAll()
        {
            var openings = new List<Openings>();
            var openingIds = _context.ApprovalTransactions.Where(x => x.ApprovalId == (int)Approval.Opening && x.IsApproved && (x.IsActive && !x.IsDeleted)).Select(x => x.EntityId).ToList();
            if (openingIds.Any())
            {
                return _context.Openings.Include(t => t.OpeningSkills).ThenInclude(r => r.Skill).Where(x => openingIds.Contains(x.OpeningId) && (x.IsActive && !x.IsDeleted)).OrderByDescending(x => x.CreatedDate).ThenByDescending(x => x.ModifiedDate).ToList();
            }
            return openings;
        }
    }
}
