import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { FormsModule } from '@angular/forms';

import { AppRouterModule } from './app.routes';
import { AppComponent } from './app.component';
import { ErrorModule } from './error/error.module';

// Module
import { LoginModule } from './Login/shared/login.module';
import { AdminModule } from './admin/shared/admin.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRouterModule, BrowserModule, ErrorModule, FormsModule, HttpClientModule,
    MomentModule,
    LoginModule, AdminModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
