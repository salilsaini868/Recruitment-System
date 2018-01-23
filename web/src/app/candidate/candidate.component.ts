import { Component, OnInit } from '@angular/core';
import { CandidateViewModel } from '../webapi/models';
import { CandidateModule } from './shared/candidate.module';
import { OpeningServiceApp } from '../opening/shared/opening.serviceApp';
import { OpeningViewModel } from '../webapi/models/opening-view-model';

export class CandidateComponent implements OnInit {

    candidateModel: CandidateViewModel = {} as CandidateModule;
    openings: OpeningViewModel[] = [] as OpeningViewModel[];

    constructor(private openigServiceApp: OpeningServiceApp) {
    }

    ngOnInit(): void {
        this.getAllOpenings();
    }

    getAllOpenings(): void {
        this.openigServiceApp.getAllOpenings().subscribe(
            (data) => {
                this.openings = data.body;
            }
        );
    }
}
