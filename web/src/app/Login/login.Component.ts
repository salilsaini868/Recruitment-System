import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { LoginServiceApp } from './shared/login.serviceApp';


// Constants
import { AppConstants } from '../shared/constant/constant.variable';
import { UserLoginModel } from '../webapi/models';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  loginModel: UserLoginModel = {} as UserLoginModel;
  constructor(private loginServiceApp: LoginServiceApp, private router: Router) {
  }

  ngOnInit() {

  }

  onSubmit(loginForm) {
    if (loginForm.valid) {
      this.loginServiceApp.userLogin(this.loginModel).subscribe(
        (data) => {
          if (!isNullOrUndefined(data)) {
            localStorage.setItem(AppConstants.AuthToken, data.body);
            this.router.navigate(['Users']);
          } else {

          }
        },
        (err) => {

        });
    }
  }

}
