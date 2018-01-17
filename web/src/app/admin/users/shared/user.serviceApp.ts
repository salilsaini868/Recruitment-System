import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService, RoleService } from '../../../webapi/services';
import 'rxjs/Rx';

@Injectable()
export class UserServiceApp {

    constructor(private apiUserService: UserService, private apiRoleService: RoleService) { }

    createUser(userModel): Observable<any> {
        return this.apiUserService.ApiUserCreateUserPost(userModel).map(x => (x));
    }

    updateUser(userModel): Observable<any> {
        return this.apiUserService.ApiUserUpdateUserPut(userModel).map(x => (x));
    }

    getAllUsers(): Observable<any> {
        return this.apiUserService.ApiUserGetAllUserGet().map(x => (x));
    }

    getUserById(userId): Observable<any> {
        return this.apiUserService.ApiUserGetUserByIdGet(userId).map(x => (x));
    }

    getAllRoles(): Observable<any> {
        return this.apiRoleService.ApiRoleGetAllRoleGet().map(x => (x));
    }
}
