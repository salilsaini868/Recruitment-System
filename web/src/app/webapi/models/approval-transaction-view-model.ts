/* tslint:disable */
import { ApprovalActionViewModel } from './approval-action-view-model';

/**
 */
export class ApprovalTransactionViewModel {
    approvalTransactionId?: number;
    approvalId?: number;
    approvalEventId?: number;
    eventOrderNumber?: number;
    nextEventOrderNumber?: number;
    approvalActionId?: number;
    entityId?: string;
    entityType?: number;
    comment?: string;
    approvalActions?: ApprovalActionViewModel[];
}
