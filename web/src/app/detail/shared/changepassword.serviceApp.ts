import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserService, RoleService } from '../../webapi/services';

@Injectable()
export class ChangepasswordServiceApp {

    constructor(private http: HttpClient, private apiChangepasswordService: UserService, private apiRoleService: RoleService) { }

    userChangepassword(UserLoginModel): Observable<any> {
        return this.apiChangepasswordService.ApiChangepasswordChangepasswordUserPost(UserLoginModel).map(x => (x));
    }

    getUser(): Observable<any> {
        return this.apiRoleService.ApiRoleGetAllRoleGet().map(x => (x));
    }
}
