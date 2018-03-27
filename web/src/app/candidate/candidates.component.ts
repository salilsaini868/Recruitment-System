import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';

import { CandidateServiceApp } from './shared/candidate.serviceApp';
import { CandidateListModel } from '../shared/customModels/candidate-list-model';
import { DisplayMessageService } from '../shared/toastr/display.message.service';
import { Status } from '../app.enum';
import { AppConstants } from '../shared/constant/constant.variable';
import { CandidateViewModel } from '../webapi/models/candidate-view-model';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-candidates',
    templateUrl: 'candidates.component.html'
})

export class CandidatesComponent implements OnInit {
    candidates: CandidateListModel[] = [] as CandidateListModel[];
    candidate: CandidateViewModel = {} as CandidateViewModel;
    loggedRole: string;
    userId: any;
    promptMsg: any;

    constructor(private candidateServiceApp: CandidateServiceApp, private router: Router,
        private msgService: DisplayMessageService, private translateService: TranslateService) {
    }

    ngOnInit() {
        this.getLoggedRole();
        this.getAllCandidates();
        this.setPromptMsg();
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

    setPromptMsg() {
        this.translateService.get('CANDIDATE.PROMPTMSG').subscribe(
            (data) => {
                this.promptMsg = data;
            }
        );
    }

    startInterview(candidate) {
        if (window.confirm(this.promptMsg)) {
            if (candidate.assignedUsers > 0) {
                if (candidate.documents > 0) {
                    this.candidateServiceApp.approvedForInterview(candidate.candidateId).subscribe(
                        (data) => {
                            if (data.status === Status.Success) {
                                this.getAllCandidates();
                            } else {
                                this.msgService.showError('Error');
                            }
                        }
                    );
                } else {
                    this.msgService.showError('CANDIDATE.NODOCUMENTS');
                }
            } else {
                this.msgService.showError('CANDIDATE.NOUSERSASSIGNED');
            }
        }
    }

    addCandidate() {
        this.router.navigate(['Candidate']);
    }

    updateCandidate(candidateId) {
        this.router.navigate(['Candidate', candidateId]);
    }

    getCandidateDetail(candidateId) {
        this.router.navigate(['CandidateDetails', candidateId]);
    }

}
