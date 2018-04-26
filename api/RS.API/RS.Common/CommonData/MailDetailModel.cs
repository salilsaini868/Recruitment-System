using RS.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace RS.Common.CommonData
{
    public class MailDetailModel
    {
        public string Subject { get; set; }
        public string EmailId { get; set; }
        public dynamic MessageBody { get; set; }
        public TemplateType Template { get; set; }
    }
}

