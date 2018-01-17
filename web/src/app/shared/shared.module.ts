import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';


// Services
import { SpinnerService, RoleGuardService, AuthService } from './index.shared';

// Constant
import { AppConstants } from './constant/constant.variable';
import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';


@NgModule({
    imports: [
        HttpClientModule,
        CommonModule, FormsModule, ReactiveFormsModule, RouterModule
    ],
    declarations: [],
    exports: [],
    providers: []
})



export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }

}
