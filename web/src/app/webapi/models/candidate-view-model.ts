/* tslint:disable */
import { CandidateDocumentViewModel } from './candidate-document-view-model';

/**
 */
export class CandidateViewModel {
    organizationId?: number;
    candidateId?: string;
    firstName?: string;
    lastName?: string;
    experienceYear?: number;
    experienceMonth?: number;
    description?: string;
    gender?: number;
    organizationName?: string;
    qualification?: number;
    qualificationName?: string;
    openingId?: string;
    openingTitle?: string;
    isReadyForInterview?: boolean;
    candidateDocument?: CandidateDocumentViewModel;
}
