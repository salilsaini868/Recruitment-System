import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ApprovalService } from '../../webapi/services/approval.service';

@Injectable()
export class ApprovalServiceApp {

  constructor(private apiApprovalService: ApprovalService) { }

  getApprovalEventsById(approvalId): Observable<any> {
    return this.apiApprovalService.ApiApprovalGetApprovalEventsGet(approvalId).map(x => (x));
  }

  getApprovals(): Observable<any> {
    return this.apiApprovalService.ApiApprovalGetApprovalsGet().map((x) => x);
  }
}
