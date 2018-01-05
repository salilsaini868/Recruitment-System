import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { Http } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

// Services

import { AuthenticatedHttpService, SpinnerService, AuthGuard } from './index.shared';

// create loader for translation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, 'i18n/', '.json');
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
        })
    ],
    declarations: [

    ],
    exports: [
        CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, RouterModule
    ],
    providers: [
        AuthGuard,
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
