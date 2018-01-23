import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OpeningRouterModule } from './opening.route';
import { OpeningComponent } from '../opening.component';
import { OpeningsComponent } from '../openings.component';
import { OpeningServiceApp } from './opening.serviceApp';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        TranslateModule,
        OpeningRouterModule
    ],
    exports: [],
    declarations: [
        OpeningsComponent,
        OpeningComponent
    ],
    providers: [OpeningServiceApp],
})

export class OpeningModule {
}
