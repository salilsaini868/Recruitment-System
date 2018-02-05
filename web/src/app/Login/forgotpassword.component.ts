import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotpasswordServiceApp } from './shared/forgotpassword.serviceApp';
import { isNullOrUndefined } from 'util';
import { UserViewModel } from '../webapi/models';
import { LoginComponent } from './login.component';
import { Status } from '../app.enum';
import { Location } from "@angular/common";

@Component({
    selector: 'app-forgotpassword',
    templateUrl: 'forgotpassword.component.html',
})
export class ForgotpasswordComponent implements OnInit {

    ForgotpasswordModel: UserViewModel = {} as UserViewModel;
    constructor(
        private forgotpasswordServiceApp: ForgotpasswordServiceApp, private location: Location,
        private router: Router) {
    }
    ngOnInit() {
    }
    onSubmit(forgotpasswordform) {
        if (forgotpasswordform.valid) {
            this.forgotpasswordServiceApp.userForgotpassword(this.ForgotpasswordModel).subscribe(
                (data) => {
                    if (!isNullOrUndefined(data) && data.status === Status.Success) {
                        this.router.navigate(['Login']);
                    } else {
                        (data) => {
                        }
                    }
                }
            );
        }
    }
    goBack() {
        this.router.navigate(['login']);
    }
    userEmail() {
    }
}
