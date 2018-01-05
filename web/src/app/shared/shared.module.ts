import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Http } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

// Services
import { AuthenticatedHttpService, SpinnerService, RoleGuardService, AuthService } from './index.shared';

// Constant
import { AppConstants } from './constant/constant.variable';

// create loader for translation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'i18n/', '.json');
}

export function GetToken() {
    return localStorage.getItem(AppConstants.AuthToken);
}

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            isolate: false
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: GetToken,
                whitelistedDomains: [''] // example http://localhost:4200/
            }
        })
    ],
    declarations: [

    ],
    exports: [
        CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, RouterModule
    ],
    providers: [
        AuthService,
        RoleGuardService,
        JwtHelperService,
        SpinnerService,
        {
            provide: Http,
            useClass: AuthenticatedHttpService
        }]
})



export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule,
            providers: []
        };
    }

    constructor(private translate: TranslateService) {
        this.translate.addLangs(['en', 'nb']);
        this.translate.use('en');
    }
}
