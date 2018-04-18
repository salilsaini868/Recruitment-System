/* tslint:disable */
import { ApprovalEvents } from './approval-events';
import { Roles } from './roles';
import { Users } from './users';

/**
 */
export class ApprovalEventRoles {
    isActive?: boolean;
    approvalEventRoleId?: number;
    roleId?: number;
    approvalEvent?: ApprovalEvents;
    role?: Roles;
    userId?: string;
    user?: Users;
    approvalEventId?: number;
    createdBy?: string;
    createdDate?: string;
    modifiedBy?: string;
    modifiedDate?: string;
    isDeleted?: boolean;
    deletedBy?: string;
    deletedDate?: string;
}
