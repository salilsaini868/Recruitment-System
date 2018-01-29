import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// Modules
import { CandidateRouterModule } from './candidate.route';

// Component
import { CandidateComponent } from '../index.candidate';
import { CandidatesComponent } from '../index.candidate';

// Services
import { CandidateServiceApp } from './candidate.serviceApp';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        TranslateModule,
        CandidateRouterModule
    ],
    exports: [],
    declarations: [CandidateComponent, CandidatesComponent],
    providers: [CandidateServiceApp],
})

export class CandidateModule {
}
