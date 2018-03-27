/* tslint:disable */
import { Organizations } from './organizations';
import { Qualifications } from './qualifications';
import { CandidateDocuments } from './candidate-documents';

/**
 */
export class Candidates {
    isReadyForInterview?: boolean;
    candidateId?: string;
    firstName: string;
    lastName?: string;
    experienceYear: number;
    experienceMonth: number;
    qualificationId: number;
    organizationId: number;
    organisation?: Organizations;
    description?: string;
    isApproved?: boolean;
    gender: number;
    qualification?: Qualifications;
    candidateDocuments?: CandidateDocuments[];
    isActive?: boolean;
    createdBy?: string;
    createdDate?: string;
    modifiedBy?: string;
    modifiedDate?: string;
    isDeleted?: boolean;
    deletedBy?: string;
    deletedDate?: string;
}
