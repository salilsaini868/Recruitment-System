/* tslint:disable */
import { UserRoles } from './user-roles';

/**
 */
export class Users {
    isActive?: boolean;
    userId?: string;
    password: string;
    email: string;
    firstName: string;
    lastName?: string;
    userRoles?: UserRoles[];
    userName: string;
    createdBy?: string;
    createdDate?: string;
    modifiedBy?: string;
    modifiedDate?: string;
    isDeleted?: boolean;
    deletedBy?: string;
    deletedDate?: string;
}
