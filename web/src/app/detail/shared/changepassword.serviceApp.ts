import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserService } from '../../webapi/services';

@Injectable()
export class ChangepasswordServiceApp {

    constructor(private http: HttpClient, private apiChangepasswordService: UserService) { }

    userChangepassword(changepasswordModel): Observable<any> {
        console.log("inside");
        return ;
    }

}
