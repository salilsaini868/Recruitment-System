import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

// Services
import { CandidateServiceApp } from './shared/candidate.serviceApp';
import { OpeningServiceApp } from '../opening/shared/opening.serviceApp';
import { QualificationsServiceApp } from '../admin/qualifications/shared/qualifications.serviceApp';

// Models
import { OpeningViewModel } from '../webapi/models/opening-view-model';
import { CandidateViewModel } from '../webapi/models';
import { QualificationViewModel } from '../webapi/models/qualification-view-model';
import { Status } from '../app.enum';

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

    constructor(private openingServiceApp: OpeningServiceApp, private candidateServiceApp: CandidateServiceApp,
        private qualificationServiceApp: QualificationsServiceApp, private route: ActivatedRoute,
        private router: Router) {
        this.years = Array(30).fill(0).map((x, i) => i);
        this.months = Array(12).fill(0).map((x, i) => i);
    }

    ngOnInit(): void {
        this.initializeMethods();
    }

    initializeMethods() {
        this.getOpenings();
        this.getCandidateById();
        this.getAllQualifications();
    }

    getAllQualifications(): void {
        this.qualificationServiceApp.getAllQualification().subscribe(
            (data) => {
                if (data.status === Status.Success) {
                    this.qualifications = data.body;
                }
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
                        }
                    }
                );
            } else {
                this.openingServiceApp.getAllOpenings().subscribe(
                    (data) => {
                        if (data.status === Status.Success) {
                            this.openings = data.body;
                        }
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
                            this.showCandidateList();
                        }
                    }
                );
            } else {
                this.candidateServiceApp.updateCandidate(this.candidateModel).subscribe(
                    (data) => {
                        if (data.status === Status.Success) {
                            this.showCandidateList();
                        }
                    }
                );
            }
        }
    }
}
