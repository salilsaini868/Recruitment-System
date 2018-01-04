import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { LoginService } from './shared/login.service';
import { UserLoginModel } from '.././services/swagger-generated/models';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  userEmail: string;
  userPassword: string;
  loginModel: UserLoginModel;
  invalidCredentials : boolean;
  errorMessage : string;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  onSubmit(loginForm) {
    if (loginForm.valid) {
      let loginModel;
      loginModel = { userEmail: this.userEmail, userPassword: this.userPassword } as UserLoginModel;
      this.loginService.userLogin(loginModel).subscribe(
        (data) => {
          if (!isNullOrUndefined(data)) {
                localStorage.setItem("auth_token", data);
          } else {
            this.invalidCredentials = true;
          }
        },
        (err) => {
          this.errorMessage = err.message;
        }
      )
    }
  }

}
