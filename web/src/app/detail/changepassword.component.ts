import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { HeaderComponent } from './../shared/header/header.component';
import { DetailModule } from './shared/detail.module';
import { ChangepasswordServiceApp }from './shared/changepassword.serviceApp'
import { isNullOrUndefined } from 'util';
import { Status } from '../app.enum';
import { UserViewModel } from '../webapi/models';
import 'rxjs/add/observable/of';


@Component({
    selector: 'app-changepassword',
    templateUrl: 'changepassword.component.html'
})
export class ChangepasswordComponent implements OnInit {
    ChangepasswordModel:  UserViewModel = {} as UserViewModel;
    passwordMismatchError: String;
    changepassword:string;
    newPassword:string;
    confirm:string;
   
    constructor(private router: Router, private changepasswordServiceApp: ChangepasswordServiceApp ) {
       
    }
    changePassword(value) {
        if (this.changePassword) {
            console.log("Change password valid");
        }
    }
    onSubmit(changepasswordform) {
        if (changepasswordform.valid) {
          debugger;
            if (this.ChangepasswordModel.newPassword === this.confirm ){
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
        this.ChangepasswordModel.newPassword = this.ChangepasswordModel.password ;
      }
    }
    ngOnInit() {
    }
    goBack() {
        this.router.navigate(['Dashboard']);
    }
    
}
