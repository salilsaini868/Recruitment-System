import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

// Services
import { DisplayMessageService } from '../shared/toastr/display.message.service';
import { OpeningService } from '../webapi/services/opening.service';
import { OpeningServiceApp } from './shared/opening.serviceApp';

// Models
import { OpeningViewModel } from '../webapi/models/opening-view-model';
import { SkillViewModel } from '../webapi/models/skill-view-model';
import { SkillModel } from '../shared/customModels/skill-model';

import { OpeningSkillType, Status, ApprovalType } from '../app.enum';
import { ApprovalServiceApp } from '../approval/shared/approval.serviceApp';
import { ApprovalTransactionViewModel } from '../webapi/models';

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
    approvalTransaction: ApprovalTransactionViewModel = {} as ApprovalTransactionViewModel;
    approval: any;
    opening: any;

    constructor(private openingServiceApp: OpeningServiceApp, private route: ActivatedRoute,
        private router: Router, private msgService: DisplayMessageService,
        private approvalServiceApp: ApprovalServiceApp) {
    }

    ngOnInit() {
        this.opening = this.openingModel;
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
        debugger;
        this.route.params.subscribe((params: Params) => {
            const openingId = params['openingId'];
            debugger;
            if (!isNullOrUndefined(openingId)) {
                this.openingServiceApp.getOpeningById(openingId).subscribe(
                    (data) => {
                        if (data.status === Status.Success) {
                            debugger;
                            this.openingModel = data.body;
                            this.opening = this.openingModel;
                            this.getApprovalTransactonById(this.opening.openingId);
                            this.checkedPrimarySkills(this.openingModel.primarySkillTypes);
                            this.checkedSecondarySkills(this.openingModel.secondarySkillTypes);
                        } else {
                            this.msgService.showError('Error');
                        }
                        this.opening = this.openingModel;
                    }
                );
            }
        });
    }

    getApprovalTransactonById(openingId: string) {
        debugger;
        if (!isNullOrUndefined(openingId)) {
            this.approvalServiceApp.getApprovalTransactionByEntity(openingId).subscribe(
                (data) => {
                    debugger;
                    if (data.status === Status.Success) {
                        this.approvalTransaction = data.body;
                    } else {

                    }
                });
        }
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

    // saveOpening(openingModel: OpeningViewModel) {
    //     if (openingModel.primarySkillTypes.length > 0) {
    //         if (!this.SameSkillinBothSkillType()) {
    //             if (isNullOrUndefined(openingModel.openingId)) {
    //                 this.openingServiceApp.CreateOpening(openingModel).subscribe(
    //                     (data) => {
    //                         if (data.status === Status.Success) {
    //                             this.showOpeningList();
    //                         } else {
    //                             this.msgService.showError('Error');
    //                         }
    //                     }
    //                 );
    //             } else {
    //                 this.openingServiceApp.UpdateOpening(openingModel).subscribe(
    //                     (data) => {
    //                         if (data.status === Status.Success) {
    //                             this.showOpeningList();
    //                         } else {
    //                             this.msgService.showError('Error');
    //                         }
    //                     }
    //                 );
    //             }
    //         } else {
    //             this.msgService.showWarning('OPENING.SAMESKILLS');
    //         }
    //     } else {
    //         this.msgService.showWarning('OPENING.PRIMARYSKILLMANDATORY');
    //     }
    // }

}
