/* tslint:disable */
import { ApprovalEvents } from './approval-events';
import { Candidates } from './candidates';
import { Users } from './users';

/**
 */
export class CandidateAssignedUserModel {
    candidateAssignedUserId?: number;
    approvalEventId?: number;
    candidateId?: string;
    approvalEvent?: ApprovalEvents;
    candidate?: Candidates;
    userId?: string;
    user?: Users;
}
