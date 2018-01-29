import { Component, OnInit } from '@angular/core';
import { OpeningServiceApp } from './shared/opening.serviceApp';
import { OpeningViewModel } from '../webapi/models/opening-view-model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-openings',
    templateUrl: 'openings.component.html'
})

export class OpeningsComponent implements OnInit {
    openings: OpeningViewModel[] = [] as OpeningViewModel[];

    constructor(private openingServiceApp: OpeningServiceApp, private router: Router) {
    }

    ngOnInit() {
        this.getAllOpenings();
    }

    getAllOpenings() {
        this.openingServiceApp.getAllOpenings().subscribe(
            (data) => {
                this.openings = data.body;
            }
        );
    }

    addOpening() {
        this.router.navigate(['opening']);
    }

    updateOpening(openingId) {
        this.router.navigate(['opening', openingId]);
    }

    addCandidate(openingId) {
        this.router.navigate(['opening/Candidate', openingId]);
    }
}
