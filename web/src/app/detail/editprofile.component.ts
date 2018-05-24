import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangepasswordServiceApp } from './shared/changepassword.serviceApp';
import { DisplayMessageService } from '../shared/toastr/display.message.service';
import { UserModel } from '../shared/customModels/user-model';
import { UserServiceApp } from '../admin/users/shared/user.serviceApp';

@Component({
    selector: 'app-editprofile',
    templateUrl: 'editprofile.component.html'
})
export class EditprofileComponent implements OnInit {

    editprofileform: any;
    userModel: UserModel = {} as UserModel;

    constructor(private router: Router, private userServiceApp: UserServiceApp, private changepasswordServiceApp: ChangepasswordServiceApp,
        private displayMessage: DisplayMessageService) {
    }
    onSubmit(editprofileform) {
        if (editprofileform.valid) {
            this.changepasswordServiceApp.userEditprofile(this.userModel).subscribe(
                (data) => {
                    this.displayMessage.showError('EDITPROFILE.DUPLICATEUSER');
                });
            this.displayMessage.showSuccess('EDITPROFILE.UPDATEPROFILESUCCESS');
        }
        editprofileform.reset();
    }
    ngOnInit() {
        this.GetUserDetails();
    }
    GetUserDetails() {
        this.userServiceApp.GetUserDetails().subscribe(
            (data) => {
                this.userModel = data.body;
            }
        );
    }
    goBack() {
        this.router.navigate(['Dashboard']);
    }
}
