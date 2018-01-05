import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from 'util';
import { ApiClientService } from '../.././services/swagger-generated/apiClientService';
import { UserViewModel } from '../../services/swagger-generated/models/UserViewModel';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    user: UserViewModel = {} as UserViewModel;

    constructor(private router: Router, private apiClient: ApiClientService) {
        // this.apiClient.ApiUserGetUserDetailsGet().subscribe(
        //     (data) => {
        //         if (!isNullOrUndefined(data)) {
        //             this.user = data;
        //         } else {
        //             this.user = null;
        //             //return false;
        //         }
        //     }
        // )
    }

    canActivate() {
        if (isNullOrUndefined(localStorage.getItem('auth_token'))) {
            this.router.navigate(['/login']);
        }
        return true;
    }

    canActivateChild() {
        return this.canActivate();
    }
}