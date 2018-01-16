using RS.Service.Interfaces;
using RS.Common.Enums;
using RS.Entity;
using RS.ViewModel.User;
using System;
using RS.Data.Interfaces;
using RS.Common.CommonData;
using RS.ViewModel.Opening;
using RS.Entity.Models;
using System.Security.Claims;
using System.Security.Principal;
using RS.Common.Extensions;
using System.Collections.Generic;
using System.Linq;

namespace RS.Service.Logic
{
    public class OpeningManagerService : IOpeningManagerService
    {
        #region Global Variables
        private readonly IOpeningRepository _openingRepository;
        private readonly ClaimsPrincipal _principal;
        #endregion
        public OpeningManagerService(IPrincipal principal, IOpeningRepository openingRepository)
        {
            _openingRepository = openingRepository;
            _principal = principal as ClaimsPrincipal;
        }

        public IResult CreateOpening(OpeningViewModel opening)
        {
            var result = new Result
            {
                Operation = Operation.Create,
                Status = Status.Success
            };
            try
            {
                var duplicateOpening = _openingRepository.GetFirstOrDefault(x => x.Title == opening.Title);
                if (duplicateOpening != null)
                {
                    result.Status = Status.Fail;
                    result.Message = OpeningStatusNotification.DuplicateOpening;
                    result.Body = null;
                }
                else
                {
                    var openingModel = new Openings();
                    openingModel.MapFromViewModel(opening, (ClaimsIdentity)_principal.Identity);
                    _openingRepository.Create(openingModel);
                    _openingRepository.SaveChanges();
                    result.Body = openingModel;
                }
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Fail;
            }
            return result;
        }

        public IResult DeleteOpening(Guid id)
        {
            throw new NotImplementedException();
        }

        public IResult GetAllOpenings()
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var openingViewModels = new List<OpeningViewModel>();
                var allOpenings = _openingRepository.GetAll().ToList();
                result.Body = openingViewModels.MapFromModel<Openings, OpeningViewModel>(allOpenings);
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Fail;
            }
            return result;
        }

        public IResult GetOpeningById(Guid id)
        {
            var result = new Result
            {
                Operation = Operation.Read,
                Status = Status.Success
            };
            try
            {
                var openingModel = new OpeningViewModel();
                var getOpening = _openingRepository.GetByID(id);
                result.Body = openingModel.MapFromModel(getOpening);
            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Fail;
            }
            return result;
        }

        public IResult UpdateOpening(OpeningViewModel opening)
        {
            var result = new Result
            {
                Operation = Operation.Update,
                Status = Status.Success
            };
            try
            {
                var duplicateOpening = _openingRepository.GetFirstOrDefault(x => x.Title == opening.Title && x.OpeningId != opening.OpeningId);
                if (duplicateOpening != null)
                {
                    result.Status = Status.Fail;
                    result.Message = OpeningStatusNotification.DuplicateOpening;
                    result.Body = null;
                }
                else
                {
                    var openingModel = new Openings();
                    openingModel.MapFromViewModel(opening, (ClaimsIdentity)_principal.Identity);
                    _openingRepository.Update(openingModel);
                    _openingRepository.SaveChanges();
                    result.Body = openingModel;
                }

            }
            catch (Exception e)
            {
                result.Message = e.Message;
                result.Status = Status.Fail;
            }
            return result;
        }
    }
}
