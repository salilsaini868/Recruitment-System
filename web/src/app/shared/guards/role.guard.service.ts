import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import decode from 'jwt-decode';

import { AuthService } from './auth.service';

// constants
import { AppConstants } from '../constant/constant.variable';
import { debounce } from 'rxjs/operators/debounce';
import { isNullOrUndefined } from 'util';


@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    let tokenPayload = '';
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem(AppConstants.AuthToken);
    // decode the token to get its payload
    if (token !== null) { tokenPayload = decode(token); }
    if (!this.auth.isAuthenticated() || tokenPayload[AppConstants.RoleClaim] !== expectedRole || isNullOrUndefined(token)) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

