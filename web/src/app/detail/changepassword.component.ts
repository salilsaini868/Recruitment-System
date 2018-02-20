import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { HeaderComponent } from './../shared/header/header.component';
import { DetailModule } from './shared/detail.module';
import { ChangepasswordServiceApp } from './shared/changepassword.serviceApp'
import { isNullOrUndefined } from 'util';
import { Status } from '../app.enum';
import { ChangePassword, UserViewModel } from '../webapi/models';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-changepassword',
    templateUrl: 'changepassword.component.html'
})
export class ChangepasswordComponent implements OnInit {
    changepasswordform: any;
    ChangepasswordModel: ChangePassword = {} as ChangePassword;
    //Changepassword: UserViewModel = {} as UserViewModel;
    newPassword: string;
    confirm: string;
    msg: string;

    constructor(private router: Router, private changepasswordServiceApp: ChangepasswordServiceApp) {
        this.msg = null;
    }
    onSubmit(changepasswordform) {
        if (changepasswordform.valid) {
            if (this.ChangepasswordModel.newPassword === this.confirm) {
                this.changepasswordServiceApp.userChangepassword(this.ChangepasswordModel).subscribe(
                    (data) => {
                    });
                    this.msg = "PASSWORD CHANGED SUCCESSFULLY";
            }
            else {
                this.msg = "Password mismatch";
            }
            console.log("this.ChangepasswordModel", this.ChangepasswordModel.oldPassword);
        }
        changepasswordform.reset();
    }
    ngOnInit() {
    }
    goBack() {
        this.router.navigate(['Dashboard']);
    }

}