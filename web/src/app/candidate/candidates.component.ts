import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CandidateServiceApp } from './shared/candidate.serviceApp';
import { CandidateListModel } from '../shared/customModels/candidate-list-model';
import { DisplayMessageService } from '../shared/toastr/display.message.service';
import { Status } from '../app.enum';

@Component({
    selector: 'app-candidates',
    templateUrl: 'candidates.component.html'
})

export class CandidatesComponent implements OnInit {
    candidates: CandidateListModel[] = [] as CandidateListModel[];

    constructor(private candidateServiceApp: CandidateServiceApp, private router: Router,
        private msgService: DisplayMessageService) {
    }

    ngOnInit() {
        this.getAllCandidates();
    }

    getAllCandidates() {
        this.candidateServiceApp.getAllCandidates().subscribe(
            (data) => {
                if (data.status === Status.Success) {
                    this.candidates = data.body;
                } else {
                    this.msgService.showError('Error');
                }
            }
        );
    }

    addCandidate() {
        this.router.navigate(['Candidate']);
    }

    updateCandidate(candidateId) {
        this.router.navigate(['Candidate', candidateId]);
    }
}
