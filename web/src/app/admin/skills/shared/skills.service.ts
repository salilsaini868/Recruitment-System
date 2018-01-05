import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ApiClientService } from '../../../services/swagger-generated/apiClientService';


@Injectable()
export class SkillsService {

    constructor(private http: Http, private apiClient: ApiClientService) { }

    CreateSkills(SkillsModel) : Observable<any> {
        
        return this.apiClient.ApiSkillUpdateSkillPut(SkillsModel).map(x => (x));
    }
   
}
