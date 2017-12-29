namespace RS.Common.Enums
{
    public static class StatusEnum
    {
        public enum Status { Fail, Success, SessionLost }
        public enum ChangePasswordStatus { InvalidOldPassword, Success, SessionLost, AccountDeactivated }
        public enum NotifyContacts { Success, Failed, SessionLost, SMSFinished }
        public enum DocumentStorageStatus { Allow, Exceeded }
        public enum Payment { Success, Declined, Unknown, Rejected }
        public enum PaymentMode { Credit, Manual, Other }
        public enum TaxInvoiceStatus { Fail, Success, Other }
        public enum GroupApiStatus { Fail, Success, Other }
        public enum EMService { Fail, Added, Updated, Other, AlreadyAdded }
        public enum ActivateAdministrator { Fail, Success, Other, EmailAlreadyExist }
        public enum CompanyAdministrator { Fail, Success, Other, EmailAlreadyExist }
        public enum ActivateProcedures { Fail, Success, Other }
        public enum RoleEnumStatus { Fail, Success, Other }
    }
}
