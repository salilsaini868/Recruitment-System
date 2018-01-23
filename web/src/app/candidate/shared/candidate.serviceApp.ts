import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { CandidateService } from '../../webapi/services/candidate.service';

@Injectable()
export class CandidateServiceApp {
    constructor(private apiCandidateSevice: CandidateService) {
    }

    addCandidate(candidateModel): Observable<any> {
        return this.apiCandidateSevice.ApiCandidateAddCandidatePost(candidateModel).map(x => (x));
    }

    updateCandidate(candidateModel): Observable<any> {
        return this.apiCandidateSevice.ApiCandidateUpdateCandidatePut(candidateModel).map(x => (x));
    }
}
