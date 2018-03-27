import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService} from '../../../webapi/services';
import 'rxjs/Rx';

@Injectable()
export class UserServiceApp {

    constructor(private apiUserService: UserService) { }

    createUser(userModel): Observable<any> {
        return this.apiUserService.ApiUserCreateUserPost(userModel).map(x => (x));
    }

    GetUserDetails(): Observable<any> {
        return this.apiUserService.ApiUserGetUserDetailsGet().map(x => (x));
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

    getUsersByRole(roleId): Observable<any> {
        return this.apiUserService.ApiUserGetUsersByRoleGet(roleId).map(x => (x));
    }
}
