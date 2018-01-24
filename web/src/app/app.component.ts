import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from './shared/constant/constant.variable';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

  constructor(translate: TranslateService) {
    translate.addLangs(['nb', 'en']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.isTokenExist();
  }

  isTokenExist() {
    const token = localStorage.getItem(AppConstants.AuthToken);
    if (!isNullOrUndefined(token)) {
      return true;
    }
    return false;
  }

  ngAfterViewChecked() {
    const documentObj = document;
    documentObj.getElementsByTagName('body')[0].classList.remove('login-inner-bg');
    const foundObj = document.getElementsByClassName('login-main');
    if (foundObj && foundObj.length > 0) {
      documentObj.getElementsByTagName('body')[0].classList.add('login-inner-bg');
    }
  }
}

