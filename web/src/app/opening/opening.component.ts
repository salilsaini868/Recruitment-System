import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OpeningViewModel } from '../webapi/models/opening-view-model';
import { OpeningService } from '../webapi/services/opening.service';
import { OpeningServiceApp } from './shared/opening.serviceApp';
import { SkillViewModel } from '../webapi/models/skill-view-model';
import { SkillModel } from '../shared/customModels/skill-model';
import { OpeningSkillType, Status, ApprovalType } from '../app.enum';
import { isNullOrUndefined } from 'util';
import { DisplayMessageService } from '../shared/toastr/display.message.service';

@Component({
    selector: 'app-opening',
    templateUrl: 'opening.component.html'
})

export class OpeningComponent implements OnInit {

    openingModel: OpeningViewModel = {} as OpeningViewModel;
    skills: SkillViewModel[] = [] as SkillViewModel[];
    skillModels: SkillModel[] = [] as SkillViewModel[];
    primarySkillModels: SkillModel[] = [] as SkillModel[];
    secondarySkillModels: SkillModel[] = [] as SkillModel[];
    approval: any;

    constructor(private openingServiceApp: OpeningServiceApp, private route: ActivatedRoute,
        private router: Router, private msgService: DisplayMessageService) {
    }

    ngOnInit() {
        this.approval = ApprovalType.Opening;
        this.getAllSkill();
        this.getOpeningById();
        this.initilaizeArray();
    }

    initilaizeArray() {
        this.openingModel.primarySkillTypes = [];
        this.openingModel.secondarySkillTypes = [];
    }

    getAllSkill() {
        this.openingServiceApp.getAllSkills().subscribe(
            (data) => {
                if (data.status === Status.Success) {
                    this.skills = data.body;
                    this.skillModels = this.skills.map(x => {
                        return {
                            skillId: x.skillId, name: x.name,
                            description: x.description, openingSkillType: x.openingSkillType, isChecked: false
                        };
                    });
                    this.primarySkillModels = this.skillModels.map(x => Object.assign({}, x));
                    this.secondarySkillModels = this.skillModels.map(x => Object.assign({}, x));
                } else {
                    this.msgService.showError('Error');
                }
            }
        );
    }

    onChangePrimarySkills(skill: SkillViewModel, isChecked: boolean) {
        if (isChecked) {
            skill.openingSkillType = OpeningSkillType.Primary;
            this.openingModel.primarySkillTypes.push(skill);
        } else {
            skill.openingSkillType = null;
            const index = this.openingModel.primarySkillTypes.findIndex(x => x.skillId === skill.skillId);
            if (index > -1) { this.openingModel.primarySkillTypes.splice(index, 1); }
        }
    }

    onChangeSecondarySkills(skill: SkillViewModel, isChecked: boolean) {
        if (isChecked) {
            skill.openingSkillType = OpeningSkillType.Secondary;
            this.openingModel.secondarySkillTypes.push(skill);
        } else {
            skill.openingSkillType = null;
            const index = this.openingModel.secondarySkillTypes.findIndex(x => x.skillId === skill.skillId);
            if (index > -1) { this.openingModel.secondarySkillTypes.splice(index, 1); }
        }
    }

    getOpeningById() {
        this.route.params.subscribe((params: Params) => {
            const openingId = params['openingId'];
            if (!isNullOrUndefined(openingId)) {
                this.openingServiceApp.getOpeningById(openingId).subscribe(
                    (data) => {
                        if (data.status === Status.Success) {
                            this.openingModel = data.body;
                            this.checkedPrimarySkills(this.openingModel.primarySkillTypes);
                            this.checkedSecondarySkills(this.openingModel.secondarySkillTypes);
                        } else {
                            this.msgService.showError('Error');
                        }
                    }
                );
            }
        });
    }

    checkedPrimarySkills(skillList: SkillViewModel[]): void {
        skillList.forEach((x) => {
            const skill = this.primarySkillModels.filter(y => y.skillId === x.skillId);
            skill.forEach((z) => z.isChecked = true);
        });
    }

    checkedSecondarySkills(skillList: SkillViewModel[]): void {
        skillList.forEach((x) => {
            const skill = this.secondarySkillModels.filter(y => y.skillId === x.skillId);
            skill.forEach((z) => z.isChecked = true);
        });
    }

    showOpeningList() {
        this.router.navigate(['openings']);
    }

    onSubmit(openingForm) {
        if (openingForm.valid) {
            if (this.openingModel.primarySkillTypes.length > 0) {
                if (!this.SameSkillinBothSkillType()) {
                    if (isNullOrUndefined(this.openingModel.openingId)) {
                        this.openingServiceApp.CreateOpening(this.openingModel).subscribe(
                            (data) => {
                                if (data.status === Status.Success) {
                                    this.showOpeningList();
                                } else {
                                    this.msgService.showError('Error');
                                }
                            }
                        );
                    } else {
                        this.openingServiceApp.UpdateOpening(this.openingModel).subscribe(
                            (data) => {
                                if (data.status === Status.Success) {
                                    this.showOpeningList();
                                } else {
                                    this.msgService.showError('Error');
                                }
                            }
                        );
                    }
                } else {
                    this.msgService.showWarning('OPENING.SAMESKILLS');
                }
            } else {
                this.msgService.showWarning('OPENING.PRIMARYSKILLMANDATORY');
            }
        }
    }

    SameSkillinBothSkillType(): boolean {
        const sameSkill = [];
        this.openingModel.primarySkillTypes.forEach(skill => {
            this.openingModel.secondarySkillTypes.forEach(value => {
                if (skill.skillId === value.skillId) {
                    sameSkill.push(skill);
                }
            });
        });
        if (sameSkill.length > 0) { return true; }
        return false;
    }
}
