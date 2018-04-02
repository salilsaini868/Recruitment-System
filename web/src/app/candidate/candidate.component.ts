import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

// Services
import { CandidateServiceApp } from './shared/candidate.serviceApp';
import { OpeningServiceApp } from '../opening/shared/opening.serviceApp';
import { QualificationsServiceApp } from '../admin/qualifications/shared/qualifications.serviceApp';
import { UtilityService } from '../shared/utility/utility.service';
import { TranslateService } from '@ngx-translate/core';

// Models
import { CandidateViewModel, QualificationViewModel, OpeningViewModel } from '../webapi/models';
import { Status, ApprovalType } from '../app.enum';
import { DisplayMessageService } from '../shared/toastr/display.message.service';

@Component({
    selector: 'app-candidate',
    templateUrl: 'candidate.component.html'
})

export class CandidateComponent implements OnInit {
    candidateModel: CandidateViewModel = {} as CandidateViewModel;
    openings: OpeningViewModel[] = [] as OpeningViewModel[];
    qualifications: QualificationViewModel[] = [] as QualificationViewModel[];
    years: number[] = [];
    months: number[] = [];
    defaultOption: any;
    approval: any;

    constructor(private openingServiceApp: OpeningServiceApp, private candidateServiceApp: CandidateServiceApp,
        private qualificationServiceApp: QualificationsServiceApp, private route: ActivatedRoute,
        private router: Router, private utilityService: UtilityService,
        private msgService: DisplayMessageService, private translateService: TranslateService) {
        this.years = this.utilityService.fillArray(30);
        this.months = this.utilityService.fillArray(12);
    }

    ngOnInit() {
        this.approval = ApprovalType.Candidate;
        this.setDefaultValues();
        this.initializeMethods();
        this.setDefaultOption();
    }

    setDefaultValues() {
        this.candidateModel.gender = -1;
        this.candidateModel.experienceYear = -1;
        this.candidateModel.experienceMonth = -1;
    }

    initializeMethods() {
        this.getOpenings();
        this.getAllQualifications();
    }

    getAllQualifications(): void {
        this.qualificationServiceApp.getAllQualification().subscribe(
            (data) => {
                if (data.status === Status.Success) {
                    this.qualifications = data.body;
                    const qualification = this.defaultOption;
                    this.qualifications.splice(0, 0, { qualificationId: 0, name: qualification });
                } else {
                    this.msgService.showError('Error');
                }
            }
        );
    }

    setDefaultOption() {
        this.translateService.get('COMMON.SELECTDEFAULT').subscribe(
            (data) => {
                this.defaultOption = data;
            }
        );
    }

    getCandidateById() {
        this.route.params.subscribe((params: Params) => {
            const candidateId = params['candidateId'];
            if (!isNullOrUndefined(candidateId)) {
                this.candidateServiceApp.getCandidateById(candidateId).subscribe(
                    (data) => {
                        if (data.status === Status.Success) {
                            this.candidateModel = data.body;
                        } else {
                            this.msgService.showError('Error');
                        }
                    }
                );
            }
        });
    }

    getOpenings() {
        this.route.params.subscribe((params: Params) => {
            const openingId = params['openingId'];
            if (!isNullOrUndefined(openingId)) {
                this.openingServiceApp.getOpeningById(openingId).subscribe(
                    (data) => {
                        if (data.status === Status.Success) {
                            this.candidateModel.opening = data.body.openingId;
                            this.openings.push(data.body);
                        } else {
                            this.msgService.showError('Error');
                        }
                    }
                );
            } else {
                this.openingServiceApp.getAllOpenings().subscribe(
                    (data) => {
                        if (data.status === Status.Success) {
                            this.openings = data.body;
                            const opening = this.defaultOption;
                            this.openings.splice(0, 0, { openingId: '0', title: opening });
                        } else {
                            this.msgService.showError('Error');
                        }
                        this.getCandidateById();
                    }
                );
            }
        });
    }

    showCandidateList() {
        this.router.navigate(['Candidates']);
    }

    onSubmit(candidateForm) {
        if (candidateForm.valid) {
            if (isNullOrUndefined(this.candidateModel.candidateId)) {
                this.candidateServiceApp.addCandidate(this.candidateModel).subscribe(
                    (data) => {
                        if (data.status === Status.Success) {
                            this.candidateModel.candidateId = data.body;
                        } else {
                            this.msgService.showError('Error');
                        }
                    }
                );
            } else {
                this.candidateServiceApp.updateCandidate(this.candidateModel).subscribe(
                    (data) => {
                        if (data.status === Status.Success) {
                            this.candidateModel.candidateId = data.body;
                        } else {
                            this.msgService.showError('Error');
                        }
                    }
                );
            }
        }
    }

    downoadFile(url) {
        window.open(url);
    }

    assignUser() {
        if (!isNullOrUndefined(this.candidateModel.candidateId)) {
            this.router.navigate(['AssignedUser', this.candidateModel.candidateId]);
        }
    }

    goBack() {
        this.router.navigate(['Candidates']);
    }

}
