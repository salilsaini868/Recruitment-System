/* tslint:disable */
import { SkillViewModel } from './skill-view-model';

/**
 */
export class OpeningViewModel {
    openingId?: string;
    title?: string;
    description?: string;
    isApproved?: boolean;
    primarySkillTypes?: SkillViewModel[];
    secondarySkillTypes?: SkillViewModel[];
    primarySkills?: string;
    secondarySkills?: string;
    createdDate?: string;
    status?: string;
}
