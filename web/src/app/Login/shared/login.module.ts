import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {BrowserModule} from '@angular/platform-browser';

// Route
import { LoginRouterModule } from './login.route';

// Component
import { LoginComponent } from '../login.Component';


@NgModule({
  imports: [
    BrowserModule, LoginRouterModule,
    TranslateModule.forRoot()
  ],
  exports: [],
  declarations: [
    LoginComponent
  ],
  providers: [],
})

export class LoginModule {
}
