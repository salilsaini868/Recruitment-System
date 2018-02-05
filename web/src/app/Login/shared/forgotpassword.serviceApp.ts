import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginService, RoleService } from '../../webapi/services';
import { UserService } from '../../webapi/services';

@Injectable()
export class ForgotpasswordServiceApp {

    constructor(private http: HttpClient, private apiForgotpasswordService: UserService, private apiRoleService: RoleService) { }
    
    userForgotpassword(userForgotpasswordModel): Observable<any> {
        return this.apiForgotpasswordService.ApiForgotpasswordLoginUserPost(userForgotpasswordModel).map(x => (x));
    }
    getUser(): Observable<any> {
        return this.apiRoleService.ApiRoleGetAllRoleGet().map(x => (x));
    }
}
