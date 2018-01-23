import { SkillViewModel } from './skill-view-model';

/* tslint:disable */

/**
 */
export class OpeningViewModel {
    openingId?: string;
    title?: string;
    description?: string;
    primarySkillTypes?:SkillViewModel[];
    secondarySkillTypes?:SkillViewModel[];
}
