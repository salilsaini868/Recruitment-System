import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginService } from '../../webapi/services/login.service';
import { UserService } from '../../webapi/services/user.service';

@Injectable()
export class ChangepasswordServiceApp {
    constructor(private http: HttpClient, private apiChangepasswordService: LoginService) { }

    userChangepassword(changepasswordModel): Observable<any> {
        return this.apiChangepasswordService.ApiLoginChangePasswordPut(changepasswordModel).map(x => (x));
    }
    userEditprofile(userModel): Observable<any> {
        return this.apiChangepasswordService.ApiLoginUpdateUserProfilePut(userModel).map(x => (x));
    }
}
