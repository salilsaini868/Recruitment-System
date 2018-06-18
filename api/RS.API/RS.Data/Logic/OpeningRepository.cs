using Microsoft.EntityFrameworkCore;
using RS.Common.Enums;
using RS.Common.Extensions;
using RS.Data;
using RS.Data.Interfaces;
using RS.Entity.DTO;
using RS.Entity.Models;
using RS.ViewModel.Opening;
using RS.ViewModel.SearchAndSortModel;
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

        public List<OpeningModelDTO> GetOpeningsCorrespondingToLoggedUser(SearchAndSortModel searchAndSortModel)
        {
            var openings = new List<OpeningModelDTO>();
            var eventRole = _context.ApprovalEventRoles.Include(x => x.ApprovalEvent).FirstOrDefault(x => x.UserId == searchAndSortModel.UserId);
            if (eventRole != null && eventRole.ApprovalEvent.ApprovalId == (int)Approval.Opening)
            {
                var openingsList = (from Opening in _context.Openings.Include(s => s.OpeningSkills).ThenInclude(r => r.Skill)

                                    join ApprovalTransaction in _context.ApprovalTransactions.Include(t => t.ApprovalAction) on Opening.OpeningId equals ApprovalTransaction.EntityId

                                    where Opening.IsActive && !Opening.IsDeleted && ApprovalTransaction.IsActive && !ApprovalTransaction.IsDeleted
                                    
                                    select new OpeningModelDTO
                                    {
                                        OpeningId = Opening.OpeningId,
                                        Title = Opening.Title,
                                        Description = Opening.Description,
                                        IsApproved = ApprovalTransaction.IsApproved,
                                        CreatedDate = Opening.CreatedDate,
                                        ModifiedDate = Opening.ModifiedDate,
                                        Status = ApprovalTransaction.ApprovalAction.ApprovalActionName,
                                        PrimarySkills = GetCorrespondingSkills(Opening.OpeningSkills.ToList(), OpeningSkillType.Primary),
                                        SecondarySkills = GetCorrespondingSkills(Opening.OpeningSkills.ToList(), OpeningSkillType.Secondary)
                                    });


                if (searchAndSortModel.SearchString != null)
                {
                    openings = openingsList.AsEnumerable().Where(x => x.Title.ToLower().Contains(searchAndSortModel.SearchString.ToLower()) || x.PrimarySkills.ToLower().Contains(searchAndSortModel.SearchString.ToLower()) || x.SecondarySkills.ToLower().Contains(searchAndSortModel.SearchString.ToLower())).ToList();
                }
                else
                {
                    openings = openingsList.ToList();
                }
            }

            if (searchAndSortModel.Property != null)
            {
                if (searchAndSortModel.Direction == 1)
                {
                    openings = openings.OrderBy(x => x.GetType().GetProperty(searchAndSortModel.Property).GetValue(x, null)).ToList();
                }
                else
                {
                    openings = openings.OrderByDescending(x => x.GetType().GetProperty(searchAndSortModel.Property).GetValue(x, null)).ToList();
                }
            }

            return openings;
        }

        private string GetCorrespondingSkills(List<OpeningSkills> openingSkills, OpeningSkillType skillType)
        {
            var skillList = openingSkills.Where(x => x.SkillType == skillType && (x.IsActive && !x.IsDeleted)).Select(x => x.Skill).ToList();
            return string.Join(",", skillList.Select(x => x.Name).ToList());
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
