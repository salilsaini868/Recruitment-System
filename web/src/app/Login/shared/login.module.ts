import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Service
import { LoginServiceApp } from './login.serviceApp';
// Route
import { LoginRouterModule } from './login.route';

// Component
import { LoginComponent } from '../login.Component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    BrowserModule, LoginRouterModule, FormsModule,
    TranslateModule.forRoot(),
    SharedModule
  ],
  exports: [],
  declarations: [
    LoginComponent
  ],
  providers: [LoginServiceApp],
})

export class LoginModule {
}
