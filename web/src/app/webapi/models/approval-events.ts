/* tslint:disable */
import { Approvals } from './approvals';
import { ApprovalActions } from './approval-actions';
import { ApprovalEventRoles } from './approval-event-roles';

/**
 */
export class ApprovalEvents {
    approvalEventId?: number;
    approvalEventName: string;
    approvalEventOrder?: number;
    approvalId?: number;
    approval?: Approvals;
    approvalActions?: ApprovalActions[];
    approvalEventRoles?: ApprovalEventRoles[];
}
