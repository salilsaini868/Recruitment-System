import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { HeaderComponent } from './../shared/header/header.component';
import { DetailModule } from './shared/detail.module';
import { ChangepasswordServiceApp }from './shared/changepassword.serviceApp'
import { isNullOrUndefined } from 'util';
import { Status } from '../app.enum';
import { UserLoginModel } from '../webapi/models';
import 'rxjs/add/observable/of';


@Component({
    selector: 'app-changepassword',
    templateUrl: 'changepassword.component.html'
})
export class ChangepasswordComponent implements OnInit {
    ChangepasswordModel:  UserLoginModel = {} as UserLoginModel;
    passwordMismatchError: String;
    changepassword:string;   
    newchangepassword:string;
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
            if (this.ChangepasswordModel.password === this.ChangepasswordModel.changepassword){
            this.changepasswordServiceApp.userChangepassword(this.changepassword).subscribe(
                (data) => {
                    if (!isNullOrUndefined(data) && data.status === Status.Success) {
                        this.router.navigate(['Dashboard']);
                    } else {
                        (data) => {
                        }
                        // if (newchangepassword === confirm )
                    }
                }
            );
        }
    }
    }
    ngOnInit() {
    }
    goBack() {
        this.router.navigate(['Dashboard']);
    }
    
}
