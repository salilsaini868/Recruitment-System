using RS.Entity.DTO;
using RS.Entity.Models;
using RS.ViewModel.Opening;
using RS.ViewModel.SearchAndSortModel;
using System;
using System.Collections.Generic;

namespace RS.Data.Interfaces
{
    public interface IOpeningRepository : IRepository<Openings>
    {
        void CreateOpening(Openings opening, List<OpeningSkills> openingSkills);

        void UpdateOpeningSkills(List<OpeningSkills> openingSkills);

        Openings GetByID(Guid openingId);

        new List<Openings> GetAll();

        List<OpeningModelDTO> GetOpeningsCorrespondingToLoggedUser(SearchAndSortModel searchAndSortModel);

    }
}
