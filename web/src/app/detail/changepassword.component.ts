import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { HeaderComponent } from './../shared/header/header.component';
import { DetailModule } from './shared/detail.module';
import { ChangepasswordServiceApp } from './shared/changepassword.serviceApp'
import { isNullOrUndefined } from 'util';
import { Status } from '../app.enum';
import { ChangePassword } from '../webapi/models';
import { DisplayMessageService } from '../shared/toastr/display.message.service';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-changepassword',
    templateUrl: 'changepassword.component.html'
})
export class ChangepasswordComponent implements OnInit {
    ChangepasswordModel: ChangePassword = {} as ChangePassword;
    changepasswordform: any;
    confirm: string;

    constructor(private router: Router, private changepasswordServiceApp: ChangepasswordServiceApp, private displayMessage: DisplayMessageService) {
    }
    onSubmit(changepasswordform) {
        if (changepasswordform.valid) {
            if (this.ChangepasswordModel.newPassword === this.confirm) {
                this.changepasswordServiceApp.userChangepassword(this.ChangepasswordModel).subscribe(
                    (data) => {
                    });
            }
            else {
                this.displayMessage.showWarning('USER.PASSWORDMISMATCH');
            }
        }
        changepasswordform.reset();
    }
    ngOnInit() {
    }
    goBack() {
        this.router.navigate(['Dashboard']);
    }
}