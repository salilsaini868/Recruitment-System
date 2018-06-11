import { Component, OnInit } from '@angular/core';
import { OpeningServiceApp } from './shared/opening.serviceApp';
import { Router } from '@angular/router';
import { Status } from '../app.enum';
import { DisplayMessageService } from '../shared/toastr/display.message.service';
import { AppConstants } from '../shared/constant/constant.variable';
import { OpeningViewModel } from '../webapi/models';
import { SearchAndSortModel } from 'app/shared/customModels/search-and-sort-model';
import { TranslateService } from '@ngx-translate/core';
import decode from 'jwt-decode';
import { OpeningListModel } from 'app/shared/customModels/opening-list-model';

@Component({
    selector: 'app-openings',
    templateUrl: 'openings.component.html'
})

export class OpeningsComponent implements OnInit {

    openings: OpeningListModel[] = [] as OpeningListModel[];
    searchAndSortModel: SearchAndSortModel = {} as SearchAndSortModel;
    listFilter: string;
    loggedRole: any;
    userId: any;
    isDesc = false;

    constructor(private openingServiceApp: OpeningServiceApp, private router: Router,
        private msgService: DisplayMessageService, private translateService: TranslateService) {
    }

    ngOnInit() {
        this.setLoggedUser();
        this.setDefaultSortOption();
    }

    setLoggedUser() {
        let tokenPayload = '';
        const token = localStorage.getItem(AppConstants.AuthToken);
        if (token !== null) {
            tokenPayload = decode(token);
            this.loggedRole = tokenPayload[AppConstants.RoleClaim];
            this.userId = tokenPayload[AppConstants.IdClaim];
        }
    }

    setDefaultSortOption() {
        this.searchAndSortModel.userId = this.userId;
        this.searchAndSortModel.direction = -1;
        this.translateService.get('OPENING.DEFAULTSORTPROPERTY').subscribe(
            (data) => {
                this.searchAndSortModel.property = data;
                this.getAllOpenings();
            }
        );
    }

    getAllOpenings() {
        this.openingServiceApp.getOpeningsCorrespondingToLoggedUser(this.searchAndSortModel).subscribe(
            (data) => {
                if (data.status === Status.Success) {
                    this.openings = data.body;
                } else {
                    this.msgService.showError('Error');
                }
            }
        );
    }

    sort(property) {
        this.isDesc = !this.isDesc;
        this.searchAndSortModel.direction = this.isDesc ? 1 : -1;
        this.searchAndSortModel.userId = this.userId;
        this.searchAndSortModel.property = property;
        this.openingServiceApp.getOpeningsCorrespondingToLoggedUser(this.searchAndSortModel).subscribe(
            (data) => {
                if (data.status === Status.Success) {
                    this.openings = data.body;
                }
            }
        );
    }

    search() {
        this.searchAndSortModel.searchString = this.listFilter;
        this.openingServiceApp.getOpeningsCorrespondingToLoggedUser(this.searchAndSortModel).subscribe(
            (data) => {
                if (data.status === Status.Success) {
                    this.openings = data.body;
                }
            }
        );
    }

    clear() {
        if (this.listFilter === '') {
            this.search();
        }
    }

    onKeydown(event) {
        if (event.key === 'Enter') {
            this.search();
        }
    }

    checkRole(loggedRole) {
        if (loggedRole === 'Sr.HR') {
            return true;
        }
        return false;
    }

    addOpening() {
        this.router.navigate(['opening']);
    }

    updateOpening(openingId) {
        this.router.navigate(['opening', openingId]);
    }

    addCandidate(openingId) {
        this.router.navigate(['opening/Candidate', openingId]);
    }

    openingDetails(openingId) {
        this.router.navigate(['openings', openingId]);
    }
}
