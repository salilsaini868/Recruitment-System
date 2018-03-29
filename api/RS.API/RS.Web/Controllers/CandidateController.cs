using Microsoft.AspNetCore.Mvc;
using RS.Common.CommonData;
using RS.Common.Enums;
using RS.ViewModel.Roles;
using RS.Service.Interfaces;
using System;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using RS.ViewModel.Candidate;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace RS.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Candidate/[Action]")]
    [Authorize]
    public class CandidateController : Controller
    {
        private readonly ICandidateManagerService _candidateManagerService;
        private readonly IHostingEnvironment _hostingEnvironment;

        public CandidateController(IHostingEnvironment hostingEnvironment, ICandidateManagerService candidateManager)
        {
            _candidateManagerService = candidateManager;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        public IResult AddCandidate(String candidate)
        {
            var candidateViewModel = JsonConvert.DeserializeObject<CandidateViewModel>(candidate);
            var file = Request.Form.Files["uploadFile"];
            var candidateDocumentViewModel = new CandidateDocumentViewModel();
            GetCandidateDocumentDetails(candidateDocumentViewModel, file);
            var addedCandidate = _candidateManagerService.AddCandidate(candidateViewModel, candidateDocumentViewModel);

            if (addedCandidate.Body != null)
            {
                SaveFile(file);
            }
            return addedCandidate;
        }

        [HttpPost]
        public IResult AddUserForCandidate([FromBody]List<CandidateAssignedUserModel> candidateAssignedUserList)
        {
            var addedCandidate = _candidateManagerService.AssignUserForCandidate(candidateAssignedUserList);
            return addedCandidate;
        }

        [HttpPut]
        public IResult UpdateCandidate(string candidate)
        {
            var candidateViewModel = JsonConvert.DeserializeObject<CandidateViewModel>(candidate);
            var file = Request.Form.Files["uploadFile"];
            var candidateDocumentViewModel = candidateViewModel.CandidateDocument;
            if (file != null)
            {
                GetCandidateDocumentDetails(candidateDocumentViewModel, file);
            }
            var updatedCandidate = _candidateManagerService.UpdateCandidate(candidateViewModel, candidateDocumentViewModel);
            return updatedCandidate;
        }

        [HttpGet]
        public IResult GetAllCandidate()
        {
            var allCandidates = _candidateManagerService.GetAllCandidate();
            return allCandidates;
        }

        [HttpGet]
        public IResult GetCandidateById(Guid id)
        {
            var candidateRecord = _candidateManagerService.GetCandidateById(id);
            return candidateRecord;
        }

        [HttpGet]
        public IResult GetAssignedUsersById(Guid candidateId)
        {
            var assignedUsers = _candidateManagerService.GetAssignedUsersById(candidateId);
            return assignedUsers;
        }

        [HttpGet]
        public IResult GetCandidatesCorrespondingToLoggedUser(Guid userId)
        {
            var assignedUsers = _candidateManagerService.GetCandidatesCorrespondingToLoggedUser(userId);
            return assignedUsers;
        }

        [HttpPut]
        public IResult ApprovedForInterview(Guid candidateId)
        {
            var approvedCandidate = _candidateManagerService.ApprovedForInterview(candidateId);
            return approvedCandidate;
        }

        private string GetExtension(IFormFile file)
        {
            string result = null;
            if (file.Length > 0)
            {
                var ext = new List<string> { ".pdf", ".doc", ".docx" };
                var extension = Path.GetExtension(file.FileName);
                if (ext.Contains(extension))
                {
                    result = extension;
                }
            }
            return result;
        }

        private void SaveFile(IFormFile file)
        {
            string path = Path.Combine(_hostingEnvironment.ContentRootPath, "uploadFiles");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            var ext = new List<string> { ".pdf", ".doc", ".docx" };
            var extension = Path.GetExtension(file.FileName);
            if (ext.Contains(extension))
            {
                var filePath = Path.Combine(path, file.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyToAsync(fileStream);
                }
            }
        }

        private void GetCandidateDocumentDetails(CandidateDocumentViewModel candidateDocumentViewModel, IFormFile file)
        {
            candidateDocumentViewModel.DocumentName = file.FileName;
            var extension = GetExtension(file);
            candidateDocumentViewModel.UploadedDocument = Guid.NewGuid().ToString() + extension;

        }
    }
}