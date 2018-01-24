import { Component, OnInit, Renderer2 } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { LoginServiceApp } from './shared/login.serviceApp';


// Constants
import { AppConstants } from '../shared/constant/constant.variable';
import { UserLoginModel } from '../webapi/models';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})

export class LoginComponent implements OnInit {
  loginModel: UserLoginModel = {} as UserLoginModel;

  constructor(private loginServiceApp: LoginServiceApp, private router: Router, private renderer: Renderer2) {
  }

  ngOnInit() {
    const urlString = this.router.url.toLowerCase();
    if (urlString.indexOf(AppConstants.routeLoginName.toLowerCase()) > -1) {
      this.renderer.addClass(document.body, 'login-inner-bg');
    }

    this.isAuthenticated();

  }

  isAuthenticated() {
    const token = localStorage.getItem(AppConstants.AuthToken);
    if (!isNullOrUndefined(token)) {
      this.router.navigate(['Dashboard']);
    }
  }

  onSubmit(loginForm) {
    if (loginForm.valid) {
      this.loginServiceApp.userLogin(this.loginModel).subscribe(
        (data) => {
          if (!isNullOrUndefined(data)) {
            localStorage.setItem(AppConstants.AuthToken, data.body);
            this.router.navigate(['Dashboard']);
          } else {

          }
        },
        (err) => {

        });
    }
  }

}
