import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//Service
import { LoginService } from './login.service';

// Route
import { LoginRouterModule } from './login.route';

// Component
import { LoginComponent } from '../login.Component';


@NgModule({
  imports: [
    BrowserModule, LoginRouterModule, FormsModule, HttpModule,
    TranslateModule.forRoot()
  ],
  exports: [],
  declarations: [
    LoginComponent
  ],
  providers: [LoginService],
})

export class LoginModule {
}
