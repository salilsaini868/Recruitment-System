import { ApprovalActionViewModel } from '../../webapi/models';

export class ApprovalEventViewModel {
    approvalEventId?: number;
    approvalEventName?: string;
    approvalEventOrder?: number;
    approvalId?: number;
    approvalActions?: ApprovalActionViewModel[];
}
