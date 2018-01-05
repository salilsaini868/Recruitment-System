import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ApiClientService } from '../.././services/swagger-generated/apiClientService';

@Injectable()
export class LoginService {

    constructor(private http: Http, private apiClient: ApiClientService) { }

    userLogin(userLoginModel) : Observable<any> {
        return this.apiClient.ApiLoginLoginUserPost(userLoginModel).map(x => (x));
    }
}