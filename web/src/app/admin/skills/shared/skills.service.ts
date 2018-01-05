import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ApiClientService } from '../../../services/swagger-generated/apiClientService';


@Injectable()
export class SkillsService {

    constructor(private http: Http, private apiClient: ApiClientService) { }

    addSkill(SkillsModel) : Observable<any> {
        
        return this.apiClient.ApiSkillCreateSkillPost(SkillsModel).map(x => (x));
    }
   
}
