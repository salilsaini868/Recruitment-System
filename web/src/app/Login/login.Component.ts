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
  constructor(private loginService: LoginServiceApp, private router: Router) {
  }

  ngOnInit() {

  }

  onSubmit(loginForm) {
    if (loginForm.valid) {
      this.loginService.userLogin(this.loginModel).subscribe(
        (data) => {
          if (!isNullOrUndefined(data)) {
            console.log(data.body);
            localStorage.setItem(AppConstants.AuthToken, data.body);
            this.router.navigate(['AdminDashboard']);
          } else {

          }
        },
        (err) => {

        });
    }
  }

}
