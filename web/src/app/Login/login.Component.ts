import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { ForgotpasswordComponent } from '../detail/forgotpassword.component';

// Models
import { UserLoginModel } from '../webapi/models';

// Constants
import { AppConstants } from '../shared/constant/constant.variable';
import { Status } from '../app.enum';

// service
import { DisplayMessageService } from '../shared/toastr/display.message.service';
import { LoginServiceApp } from './shared/login.serviceApp';
//import { CommonService } from '../shared/commonService/commonService.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})

export class LoginComponent implements OnInit {
  loginModel: UserLoginModel = {} as UserLoginModel;
  show: boolean = false;

  constructor(private loginServiceApp: LoginServiceApp, private router: Router, private msgService: DisplayMessageService) {
  }

  ngOnInit() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    const token = localStorage.getItem(AppConstants.AuthToken);
    if (!isNullOrUndefined(token)) {
      this.router.navigate(['Dashboard']);
    }
  }
  showPopup() {
    this.show = true;
    console.log("click new component" + this.show);
    //  this.commonServiceApp.callMethodOfSecondComponent();
     this.onShow(true);
  }

  onSubmit(loginForm) {
    if (loginForm.valid) {
      this.loginServiceApp.userLogin(this.loginModel).subscribe(
        (data) => {
          if (!isNullOrUndefined(data) && data.status === Status.Success) {
            localStorage.setItem(AppConstants.AuthToken, data.body);
            this.router.navigate(['Dashboard']);
          } else {
            this.msgService.showError('LOGIN.INVALIDLOGIN');
          }
        },
        (err) => {
        });
    }
  }

}
