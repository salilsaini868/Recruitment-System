import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======
>>>>>>> develop

// Service
import { LoginServiceApp } from './login.serviceApp';
// Route
import { LoginRouterModule } from './login.route';

// Component
import { LoginComponent } from '../login.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule, FormsModule,
    TranslateModule.forRoot(),
    LoginRouterModule
  ],
  exports: [
  ],
  declarations: [
    LoginComponent
  ],
  providers: [LoginServiceApp],
})

export class LoginModule {
}
