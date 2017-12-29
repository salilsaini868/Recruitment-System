using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace RS.Entity.Models
{
    public partial class CandidateDocuments : BaseEntity
    {
        [Key]
        [DefaultValue("newid()")]
        public Guid CandidateDocumentId { get; set; }
        public Guid CandidateId { get; set; }
        public string UploadedDocumentName { get; set; }
        public string UploadedDocumentPath { get; set; }

        public Candidate Candidate { get; set; }
    }
}
