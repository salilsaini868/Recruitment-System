/* tslint:disable */
import { Candidates } from './candidates';

/**
 */
export class Qualifications {
    createdDate?: string;
    qualificationId?: number;
    description: string;
    candidate?: Candidates[];
    isActive?: boolean;
    createdBy?: string;
    name: string;
    modifiedBy?: string;
    modifiedDate?: string;
    isDeleted?: boolean;
    deletedBy?: string;
    deletedDate?: string;
}
