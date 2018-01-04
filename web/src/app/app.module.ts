import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MomentModule } from 'angular2-moment';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
=======


>>>>>>> develop
import { AppRouterModule } from './app.routes';
import { AppComponent } from './app.component';
import { ErrorModule } from './error/error.module';

//Service
import { ApiClientService } from '../app/services/swagger-generated/apiClientService';

// Module
import { LoginModule } from './Login/shared/login.module';
import { AdminModule } from './admin/shared/admin.module';
import { ServiceModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRouterModule, BrowserModule, ErrorModule,  
    MomentModule,
    LoginModule, AdminModule,ServiceModule,
    SharedModule.forRoot()
    ],
  exports: [],
  providers: [ApiClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
