import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { SkillServiceApp } from '../../../webapi/services/skill.service';

@Injectable()
export class SkillsService {

    constructor(private apiSkillsService: SkillServiceApp) { }
    addSkill(SkillsModel): Observable<any> {
        return this.apiSkillsService.ApiSkillCreateSkillPost(SkillsModel).map(x => (x));
    }
    listSkill(): Observable<any> {
        return this.apiSkillsService.ApiSkillGetAllSkillGet().map(x => (x));
    }
    deleteSkill(): Observable<any> {
        return;
    }
    updateSkill(SkillsModel): Observable<any> {
        return this.apiSkillsService.ApiSkillUpdateSkillPut(SkillsModel).map(x => (x));
    }
}




