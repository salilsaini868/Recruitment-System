import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';

import { CandidateServiceApp } from './shared/candidate.serviceApp';
import { CandidateListModel } from '../shared/customModels/candidate-list-model';
import { DisplayMessageService } from '../shared/toastr/display.message.service';
import { Status } from '../app.enum';
import { AppConstants } from '../shared/constant/constant.variable';

@Component({
    selector: 'app-candidates',
    templateUrl: 'candidates.component.html'
})

export class CandidatesComponent implements OnInit {
    candidates: CandidateListModel[] = [] as CandidateListModel[];
    loggedRole: string;
    userId: any;

    constructor(private candidateServiceApp: CandidateServiceApp, private router: Router,
        private msgService: DisplayMessageService) {
    }

    ngOnInit() {
        this.getLoggedRole();
        this.getAllCandidates();
    }

    getLoggedRole() {
        let tokenPayload = '';
        const token = localStorage.getItem(AppConstants.AuthToken);
        // decode the token to get its payload
        if (token !== null) {
            tokenPayload = decode(token);
            this.loggedRole = tokenPayload[AppConstants.RoleClaim];
            this.userId = tokenPayload[AppConstants.IdClaim];
        }
    }

    getAllCandidates() {
        if (this.loggedRole === 'Sr.HR') {
            this.candidateServiceApp.getAllCandidates().subscribe(
                (data) => {
                    if (data.status === Status.Success) {
                        this.candidates = data.body;
                    } else {
                        this.msgService.showError('Error');
                    }
                }
            );
        } else {
            this.candidateServiceApp.getCandidatesCorrespondingToLoggedUser(this.userId).subscribe(
                (data) => {
                    if (data.status === Status.Success) {
                        this.candidates = data.body;
                    } else {
                        this.msgService.showError('Error');
                    }
                }
            );
        }
    }

    addCandidate() {
        this.router.navigate(['Candidate']);
    }

    updateCandidate(candidateId) {
        this.router.navigate(['Candidate', candidateId]);
    }

    assignUser(candidateId) {
        this.router.navigate(['AssignedUser', candidateId]);
    }

    getCandidateDetail(candidateId) {
        this.router.navigate(['CandidateDetails', candidateId]);
    }
}
