import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MomentModule } from 'angular2-moment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

// components
import { AppComponent } from './app.component';
import { AppRouterModule } from './app.routes';

// Module
import { LoginModule } from './Login/shared/login.module';
import { AdminModule } from './admin/shared/admin.module';
import { SharedModule } from './shared/shared.module';
import { ErrorModule } from './error/error.module';
import { OpeningModule } from './opening/shared/opening.module';

// constants
import { AppConstants } from './shared/constant/constant.variable';

import { AuthService, RoleGuardService, SpinnerDirective, SpinnerService,
  AuthInterceptor, ToastrService, HeaderComponent } from './shared/index.shared';
import { ApiModule } from './webapi/api.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function GetToken() {
  return localStorage.getItem(AppConstants.AuthToken);
}

@NgModule({
  declarations: [
    AppComponent, SpinnerDirective, HeaderComponent
  ],
  imports: [
    AppRouterModule, ErrorModule, BrowserModule, FormsModule,
    MomentModule, HttpClientModule, ApiModule, LoginModule,
    AdminModule, SharedModule, OpeningModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: GetToken,
        whitelistedDomains: [''] // example http://localhost:4200/
      }
    })
  ],
  exports: [],
  providers: [
    AuthService,
    RoleGuardService,
    JwtHelperService,
    SpinnerService,
    ToastrService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
