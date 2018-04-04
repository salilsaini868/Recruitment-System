import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword.component';

// Models
import { UserLoginModel } from '../webapi/models';

// Constants
import { AppConstants } from '../shared/constant/constant.variable';
import { Status } from '../app.enum';

// service
import { DisplayMessageService } from '../shared/toastr/display.message.service';
import { LoginServiceApp } from './shared/login.serviceApp';
import { UtilityService } from '../shared/utility/utility.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['shared/login.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {
  loginModel: UserLoginModel = {} as UserLoginModel;

  formErrors = {
    'userName': '',
    'password': ''
  };
  myForm: NgForm;
  @ViewChild('loginForm') currentForm: NgForm;

  constructor(private loginServiceApp: LoginServiceApp, private router: Router,
    private msgService: DisplayMessageService, private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.isAuthenticated();
  }

  ngAfterViewChecked() {
    if (this.currentForm === this.myForm) { return; }
    this.myForm = this.currentForm;

  }

  isAuthenticated() {
    const token = localStorage.getItem(AppConstants.AuthToken);
    if (!isNullOrUndefined(token)) {
      this.router.navigate(['Dashboard']);
    }
  }

  forgotpassword() {
    this.router.navigate(['forgotpassword']);
  }

  onSubmit(loginForm) {
    if (loginForm.valid && this.validateCustomControls()) {
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
    } else {
      this.validateForm();
    }
  }

  validateForm() {
    this.utilityService.validateRequiredInputControls(this.myForm.form, this.formErrors);
    this.validateCustomControls();
  }

  validateCustomControls() {
    let isValid = true;
    let field: string;
    if (isNullOrUndefined(this.loginModel.userEmail)) {
      field = 'userName';
      this.formErrors[field] = this.utilityService.showTranslatedText('OTHERS.REQUIRED');
      isValid = false;
    }
    if (isNullOrUndefined(this.loginModel.userPassword)) {
      field = 'password';
      this.formErrors[field] = this.utilityService.showTranslatedText('OTHERS.REQUIRED');
      isValid = false;
    }
    return isValid;
  }
}
