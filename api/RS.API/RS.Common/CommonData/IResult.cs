using RS.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace RS.Common.CommonData
{
    public interface IResult
    {
        Operation Operation { get; set; }

        Status Status { get; set; }

        String ExceptionMessage { get; set; }

        dynamic Body { get; set; }
    }

    public class Result : IResult
    {
        public Operation Operation { get; set; }
        public Status Status { get; set; }
        public String ExceptionMessage { get; set; }
        public dynamic Body { get; set; }
    }
}
