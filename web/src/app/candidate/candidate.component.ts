import { Component, OnInit } from '@angular/core';
import { CandidateModule } from './shared/candidate.module';

// Services
import { CandidateServiceApp } from './shared/candidate.serviceApp';
import { OpeningServiceApp } from '../opening/shared/opening.serviceApp';
import { QualificationsServiceApp } from '../admin/qualifications/shared/qualifications.serviceApp';

// Models
import { OpeningViewModel } from '../webapi/models/opening-view-model';
import { CandidateViewModel } from '../webapi/models';
import { QualificationViewModel } from '../webapi/models/qualification-view-model';

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

    constructor(private openigServiceApp: OpeningServiceApp, private candidateServiceApp: CandidateServiceApp,
        private qualificationServiceApp: QualificationsServiceApp) {
        this.years = Array(30).fill(0).map((x, i) => i);
        this.months = Array(12).fill(0).map((x, i) => i);
    }

    ngOnInit(): void {
        this.getAllOpeningsAndQualifications();
    }

    getAllOpeningsAndQualifications(): void {
        this.openigServiceApp.getAllOpenings().subscribe(
            (data) => {
                this.openings = data.body;
            }
        );
        this.qualificationServiceApp.getAllQualification().subscribe(
            (data) => {
                this.qualifications = data.body;
            }
        );
    }

    onSubmit(candidateForm) {
        if (candidateForm.valid) {
            this.candidateServiceApp.addCandidate(this.candidateModel).subscribe(
                (data) => {
                    console.log(data.body);
                }
            );
        }
    }
}
