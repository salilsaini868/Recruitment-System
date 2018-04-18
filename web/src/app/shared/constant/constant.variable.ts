export class AppConstants {
  public static get routeLoginName(): string { return 'login'; }
  public static get AuthToken(): string { return 'auth_token'; }
  public static get ApprovalTypeRole(): string { return 'http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor'; }
  public static get RoleClaim(): string { return 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'; }
  public static get EmailClaim(): string { return 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'; }
  public static get NameClaim(): string { return 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'; }
  public static get IdClaim(): string { return 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'; }
  public static get uriForAdd(): string { return '/api/Candidate/AddCandidate'; }
  public static get uriForUpdate(): string { return '/api/Candidate/UpdateCandidate'; }
  public static get uriForFile(): string { return '/api/Candidate/DownloadFile'; }
  public static get delayTime(): number { return 1000; }
  public static get minimumLength(): number { return 2; }
  public static get defaultValue(): number { return -1; }
}
