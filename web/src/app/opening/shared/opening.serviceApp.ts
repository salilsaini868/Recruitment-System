import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OpeningService, SkillService } from '../../webapi/services';
import { retry } from 'rxjs/operator/retry';
import 'rxjs/Rx';


@Injectable()
export class OpeningServiceApp {

    constructor(private http: HttpClient, private apiOpeningService: OpeningService, private apiSkillService: SkillService) { }

    CreateOpening(openingModel): Observable<any> {
        return this.apiOpeningService.ApiOpeningCreateOpeningPost(openingModel).map(x => (x));
    }

    getAllSkills(): Observable<any> {
        return this.apiSkillService.ApiSkillGetAllSkillGet().map(x => (x));
    }

    getAllOpenings(): Observable<any> {
        return this.apiOpeningService.ApiOpeningGetAllOpeningGet().map(x => (x));
    }

    getOpeningById(openingId): Observable<any> {
        return this.apiOpeningService.ApiOpeningGetOpeningByIdGet(openingId).map(x => (x));
    }

    UpdateOpening(openingModel): Observable<any> {
        return this.apiOpeningService.ApiOpeningUpdateOpeningPut(openingModel).map(x => (x));
    }
}
