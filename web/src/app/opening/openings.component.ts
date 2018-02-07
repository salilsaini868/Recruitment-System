import { Component, OnInit } from '@angular/core';
import { OpeningServiceApp } from './shared/opening.serviceApp';
import { OpeningViewModel } from '../webapi/models/opening-view-model';
import { Router } from '@angular/router';
import { Status } from '../app.enum';
import { DisplayMessageService } from '../shared/toastr/display.message.service';

@Component({
    selector: 'app-openings',
    templateUrl: 'openings.component.html'
})

export class OpeningsComponent implements OnInit {
    openings: OpeningViewModel[] = [] as OpeningViewModel[];

    constructor(private openingServiceApp: OpeningServiceApp, private router: Router,
        private msgService: DisplayMessageService) {
    }

    ngOnInit() {
        this.getAllOpenings();
    }

    getAllOpenings() {
        this.openingServiceApp.getAllOpenings().subscribe(
            (data) => {
                if (data.status === Status.Success) {
                    this.openings = data.body;
                } else {
                    this.msgService.showError('Error');
                }
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
