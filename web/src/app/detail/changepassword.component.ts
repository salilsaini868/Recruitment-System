import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { HeaderComponent } from './../shared/header/header.component';
import { DetailModule } from './shared/detail.module';
import { ChangepasswordServiceApp }from './shared/changepassword.serviceApp'
import { isNullOrUndefined } from 'util';
import { Status } from '../app.enum';
import { UserLoginModel } from '../webapi/models';


@Component({
    selector: 'app-changepassword',
    templateUrl: 'changepassword.component.html'
})
export class ChangepasswordComponent implements OnInit {
    changepassword:string;   
    newchangepassword:string;
    confirm:string;
   
    constructor(private router: Router) {
       
    }

    changePassword(value) {
        if (this.changePassword) {
            console.log("Change password valid");
        }
    }

    onSubmit(value: any) {
        console.log(value);
        // if (forgotpasswordform.valid) {
        //     this.changepasswordServiceApp.userLogin(this.changepassword).subscribe(
        //         (data) => {
        //             if (!isNullOrUndefined(data) && data.status === Status.Success) {
        //                 this.router.navigate(['Dashboard']);
        //             } else {
        //                 (data) => {
        //                 }
        //             }
        //         }
        //     );
        // }
    }
    ngOnInit() {
    }

    goBack() {
        this.router.navigate(['Dashboard']);
    }
    
}
