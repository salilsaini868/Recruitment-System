/* tslint:disable */
import { Roles } from './roles';
import { Users } from './users';

/**
 */
export class UserRoles {
    createdBy?: string;
    userRolesId?: string;
    userId?: string;
    roleId?: number;
    role?: Roles;
    isActive?: boolean;
    user?: Users;
    createdDate?: string;
    modifiedBy?: string;
    modifiedDate?: string;
    isDeleted?: boolean;
    deletedBy?: string;
    deletedDate?: string;
}
