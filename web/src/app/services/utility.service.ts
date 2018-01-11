import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiClientService } from '../services/swagger-generated/apiClientService';
import { RoleViewModel } from '../services/customModels/RoleViewModel';

@Injectable()
export class UtilityService {

    constructor(private apiClient: ApiClientService) {
    }

    getRoles(): Observable<any> {
        return this.apiClient.ApiRoleGetAllRoleGet().map(x => (x));
    }
}