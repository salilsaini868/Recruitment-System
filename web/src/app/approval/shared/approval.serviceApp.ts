import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ApprovalService } from '../../webapi/services/approval.service';

@Injectable()
export class ApprovalServiceApp {

  constructor(private apiApprovalService: ApprovalService) { }


  getAllApprovalEvents(approvalId): Observable<any> {
    return this.apiApprovalService.ApiApprovalGetAllApprovalEventsGet(approvalId).map(x => (x));
  }

}
