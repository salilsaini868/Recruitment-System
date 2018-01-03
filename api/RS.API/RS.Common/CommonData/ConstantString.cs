namespace RS.Common.CommonData
{
    public class ConstantString
    {

    }
    public static class UserAccountNotification
    {
        public const string EmailNotFound = "Email Id not found";
        public const string AccountDeactiveOrExpirePass = "Your account has been locked out or temporarily deactivated.";
        public const string Success = "Successfully Logged in";
        public const string UserDeleted = "User Deleted Successfully";
        public const string InvalidPassword = "The user name or password provided is incorrect.";
        public const string PasswordExpired = "The user name or password provided is incorrect.";
        public const string LoginFailed = "Something went wrong, please try after some time or contact system administration.";
        public const string EmailAlreadyExists = "The email address entered is already in use.";
        public const string PrimaryEmailAlreadyExists = "Primary Email and Secondary Email should not be same.";
        public const string AccountNoResponseTeam = "Sorry, your account seems not associated with any role.";
        public const string LoginFailedStatus = "Failed Login";
        public const string LoginStatus = "Login";
        public const string AccountTrialExpired = "Your trial subscription package has been expired. Please subscribe to other package.";
        public const string AccountNotExists = "Sorry we didn't recognize your login details or something went wrong with your account.";
        public const string AccountNotAuthorize = "Your account is not authorized to use this service.";
        public const string UserNamePasswordNotVaild = "User name or password is not valid.";
        public const string FollowInstructionsForChangePassword = "Please check your email and follow the instructions to change password.";
        public const string UsernameIncorrect = "The User name provided is incorrect.";
        public const string ExpiredLink = "You may have clicked the expire link.";
        public const string ProvidedEmailAlreadyExists = "The provided email address already registered. Please use another email.";
        public const string ResetPassword = "Reset Password";
        public const string ComplexPasswordMinimumLength = "Password must contain minimum length of 10 characters, including numeric characters (0–9), uppercase alphabetic characters (A–Z), lowercase alphabetic characters (a–z) and special characters.";
        public const string SimplePasswordMinimumLength = "Password must contain minimum length of 6 characters, including numeric characters (0–9), uppercase alphabetic characters (A–Z), lowercase alphabetic characters (a–z).";
        public const string ClientNotActiveOrDeleted = "It seems that your client currently not active or deleted.";
        public const string CheckUserUpdatingError = "Error while updating.";
        public const string EmailIDAlreadyExists = "The user with this email id already exists.Please choose another email.";
        public const string AdminUserCreated = "Admin User created successfully.";
        public const string UserCreated = "User created successfully.";
        public const string BusinessImpactDescriptor = "Business Impact Descriptor data saved successfully.";
        public const string SystemCategories = "System categories cannot be deleted.";
        public const string YourCurrentPassword = "Your current password does not match.";
        public const string YourPasswordChanged = "Your password has been changed successfully.";
        public const string IncidentAssessmentQuestions = "Incident Assessment Questions data saved successfully.";
        public const string NameOfYourApplication = "Name of Your Application";
        public const string NoDataFound = "No record(s) found!!";
        public const string ClientProfileUpdated = "Client Profile updated successfully.";
        public const string ClientProfileAdded = "Client Profile added successfully.";
        public const string AdminUserUpdated = "Admin User updated successfully.";
        public const string UserAlreadyAssigned = "There is a user already assigned for this Subset on this Role and Response Team.";

    }

    public static class StatusMessage
    {
        public const string UnknownError = "Sorry, we have encountered an error.";
        public const string Success = "Data has been updated successfully.";
    }

    public static class PaymentStatusMessages
    {
        public const string PaymentSuccess = "Your transaction has been completed successfully.";
        public const string PaymentFail = "We are sorry your transaction has not been completed.";
        public const string PaymentDeclined = "Unfortunately your transaction has been declined by the bank.";
        public const string PaymentRejected = "Unfortunately your transaction has been rejected by the bank.";
        public const string PaymentUnknownError = "Unfortunately some unknown errors has occurred.";
        public const string ReferenceGenerationError = "Unfortunately some errors has occurred while generating customer number.";
        public const string PaymentRefund = "Unfortunately some errors has occurred while registering your account, your amount will be refunded in next 5-7 business days on same payment type. {0}";
        public const string PaymentRefundUpgradeDowngrade = "Unfortunately some errors has occurred while updating your account, your amount will be refunded in next 5-7 business days on same payment type. {0}";
        public const string NoPaymentRefund = "Unfortunately some errors has occurred while registering your account.";
        public const string DuplicateTransaction = "Possible duplicate payment attempt. Please check your statement and confirm whether transaction has been processed before retrying.";
        public const string PaymentConfirmationMessage = "The process has been completed successfully. A confirmation email has been sent to you.";
    }

    public static class EntityStatusNotification
    {
        public const string EntityCreated = "Entity created succesfully";
        public const string EntityUpdated = "Entity has been updated successfully.";
        public const string EntityDeleted = "Entity deleted successfully";

    }

    public static class OfficesStatusNotification
    {
        public const string OfficeCreated = "Office created succesfully";
        public const string OfficeUpdated = "Office has been updated successfully.";
        public const string OfficeDeleted = "Office deleted successfully";

    }

    public static class RoleStatusNotification
    {
        public const string RoleCreated = "Role Created";
        public const string RoleUpdated = "Role Updated";
        public const string RoleDeleted = "Role Deleted";

    }
    public static class SkillStatusNotification
    {
        public const string SkillCreated = "Skill Created";
        public const string SkillUpdated = "Skill Updated";
        public const string SkillDeleted = "Skill Deleted";
        public const string DuplicateSkill = "Skill with the same name Already Exists!.";

    }

    public static class QualificationStatusNotification
    {
        public const string QualificationCreated = "Qualification Created";
        public const string QualificationUpdated = "Qualification Updated";
        public const string QualificationDeleted = "Qualification Deleted";
        public const string DuplicateQualification = "Qualification with the same name Already Exists!.";

    }

    public static class HullTypeStatusNotification
    {
        public const string HullTypeCreated = "HullType Created";
        public const string HullTypeUpdated = "HullType Updated";
        public const string HullTypeDeleted = "HullType Deleted";

    }
    public static class CommonErrorMessages
    {
        public const string UnknownError = "Sorry, we have encountered an error.";
        public const string BadRequest = "Invalid Request";
    }
}
