import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { ApiClientService } from '../../../services/swagger-generated/apiClientService';

@Injectable()
export class UserService {

    constructor(private http: Http, private apiClient: ApiClientService) { }

    createUser(userModel) : Observable<any> {
        return this.apiClient.ApiUserCreateUserPost(userModel).map(x => (x));
    }

    updateUser(userModel) : Observable<any> {
        return this.apiClient.ApiUserUpdateUserPut(userModel).map(x => (x));
    }

    getAllUsers() : Observable<any> {
        return this.apiClient.ApiUserGetAllUserGet().map(x => (x));
    }

    getUserById(userId) : Observable<any> {
        return this.apiClient.ApiUserGetUserByIdGet(userId).map(x => (x));
    }
    
}