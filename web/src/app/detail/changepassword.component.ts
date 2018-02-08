import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { HeaderComponent } from './../shared/header/header.component';
import { DetailModule } from './shared/detail.module';
import { ChangepasswordServiceApp } from './shared/changepassword.serviceApp'
import { isNullOrUndefined } from 'util';
import { Status } from '../app.enum';
import { UserViewModel } from '../webapi/models';
import 'rxjs/add/observable/of';
import { DisplayMessageService } from '../shared/toastr/display.message.service';


@Component({
    selector: 'app-changepassword',
    templateUrl: 'changepassword.component.html'
})
export class ChangepasswordComponent implements OnInit {
    ChangepasswordModel: UserViewModel = {} as UserViewModel;
    password: string;
    newPassword: string;
    confirm: string;

    constructor(private router: Router, private changepasswordServiceApp: ChangepasswordServiceApp, private displayMessage: DisplayMessageService) {

    }
    onSubmit(changepasswordform) {
        if (changepasswordform.valid) {
            if (this.ChangepasswordModel.newPassword === this.confirm) {
                console.log("this.ChangepasswordModel",this.ChangepasswordModel);
                this.changepasswordServiceApp.userChangepassword(this.newPassword).subscribe(
                    (data) => {
                        if (!isNullOrUndefined(data) && data.status === Status.Success) {
                            this.router.navigate(['Dashboard']);
                        } else {
                            (data) => {
                            }
                        }
                    }
                );
            }
            else {
                this.displayMessage.showWarning('USER.PASSWORDMISMATCH');
            }
            this.ChangepasswordModel.newPassword = this.ChangepasswordModel.password;
        }
    }
    ngOnInit() {
    }
    goBack() {
        this.router.navigate(['Dashboard']);
    }

}
