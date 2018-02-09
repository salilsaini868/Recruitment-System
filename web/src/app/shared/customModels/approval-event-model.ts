import { ApprovalActionModel } from './approval-action-model';

export class ApprovalEventModel {
    approvalEventId?: number;
    approvalEventName?: string;
    approvalEventOrder?: number;
    approvalId?: number;
    approvalActions?: ApprovalActionModel[];
}

