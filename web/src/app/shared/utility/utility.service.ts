import { Injectable } from '@angular/core';
import { AppConstants } from '../constant/constant.variable';
import { isNullOrUndefined } from 'util';
import { SideBarModel } from '../customModels/side-bar-model';
import { Observable } from 'rxjs/Observable';
import { HttpResponse, HttpClient } from '@angular/common/http';
import decode from 'jwt-decode';
import { Response } from '@angular/http/src/static_response';
import { ResponseContentType } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UtilityService {
    admin: SideBarModel[] = [] as SideBarModel[];
    user: SideBarModel[] = [] as SideBarModel[];

    constructor(private http: HttpClient, private translateService: TranslateService) {
        this.admin = [{ name: 'Dashboard', order: 1 }, { name: 'Users', order: 4 },
        { name: 'Skills', order: 2 }, { name: 'Qualifications', order: 3 }, { name: 'UserEventRole', order: 5 }];
        this.user = [{ name: 'Dashboard', order: 1 }, { name: 'openings', order: 2 }, { name: 'Candidates', order: 3 }];
    }

    fillArray(n: number): any[] {
        return Array(n).fill(0).map((x, i) => i);
    }

    getLeftSideBar(): any[] {
        let tokenPayload = '';
        const token = localStorage.getItem(AppConstants.AuthToken);
        if (!isNullOrUndefined(token)) { tokenPayload = decode(token); }
        if (tokenPayload[AppConstants.RoleClaim] === 'Admin') {
            return this.admin;
        } else {
            return this.user;
        }
    }
}
