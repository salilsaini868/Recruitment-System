import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CandidateComponent } from '../candidate.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        TranslateModule,
        CandidateComponent
    ],
    exports: [],
    declarations: [
    ],
    providers: [],
})

export class CandidateModule {
}
