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
import {
    SpinnerService, RoleGuardService, AuthService,
    HeaderComponent, HeaderMainComponent, FooterComponent
} from './index.shared';

// Constant
import { AppConstants } from './constant/constant.variable';
import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
    imports: [
        HttpClientModule,
        CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    declarations: [HeaderMainComponent, HeaderComponent, FooterComponent],
    exports: [HeaderMainComponent, HeaderComponent, FooterComponent],
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
