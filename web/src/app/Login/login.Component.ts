import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { LoginService } from './shared/login.service';
import { UserLoginModel } from '.././services/swagger-generated/models/UserLoginModel';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  loginModel: UserLoginModel = {} as UserLoginModel;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  onSubmit(loginForm) {

    if (loginForm.valid) {
      this.loginService.userLogin(this.loginModel).subscribe(
        (data) => {
          if (!isNullOrUndefined(data)) {
            console.log(data);
            localStorage.setItem("auth_token", data);
          } else {

          }
        },
        (err) => {

        }
      )
    }
  }

}
