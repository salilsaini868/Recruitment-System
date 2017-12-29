using System;

namespace RS.Common.CommonData
{
    public class UserActivityReason
    {
        public bool ReturnFlag { get; set; }
        public bool TempInitial { get; set; }
        public string Message { get; set; }
        public Guid? UserId { get; set; }
        public Guid? UserTypeId { get; set; }
    }
}
