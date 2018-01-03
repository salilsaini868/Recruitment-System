import { Component, OnInit } from '@angular/core';
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

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  onSubmit(loginForm) {
    if (loginForm.valid) {
      let loginModel;
      loginModel = { userEmail: this.userEmail, userPassword: this.userPassword } as UserLoginModel;
      this.loginService.userLogin(loginModel).subscribe(

      )
    }
  }

}
