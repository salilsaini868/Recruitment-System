/* tslint:disable */
import { ApprovalActionViewModel } from './approval-action-view-model';

/**
 */
export class ApprovalTransactionViewModel {
    permissibleEvent?: number;
    approvalTransactionId?: number;
    approvalEventOrder?: number;
    eventOrderNumber?: number;
    nextEventOrderNumber?: number;
    approvalId?: number;
    approvalActionId?: number;
    entityId?: string;
    entityType?: number;
    comments?: string;
    approvalActions?: ApprovalActionViewModel[];
}
