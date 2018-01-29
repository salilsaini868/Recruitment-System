import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CandidateServiceApp } from './shared/candidate.serviceApp';
import { CandidateListModel } from '../shared/customModels/candidate-list-model';

@Component({
    selector: 'app-candidates',
    templateUrl: 'candidates.component.html'
})

export class CandidatesComponent implements OnInit {
    candidates: CandidateListModel[] = [] as CandidateListModel[];

    constructor(private candidateServiceApp: CandidateServiceApp, private router: Router) {
    }

    ngOnInit() {
        this.getAllCandidates();
    }

    getAllCandidates() {
        this.candidateServiceApp.getAllCandidates().subscribe(
            (data) => {
                this.candidates = data.body;
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
