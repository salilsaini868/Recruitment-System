import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AutocompleteModule } from 'ng2-input-autocomplete';

// Modules
import { CandidateRouterModule } from './candidate.route';

// Component
import { CandidateComponent, CandidatesComponent, AssignedUserComponent, CandidateDetailsComponent } from '../index.candidate';

// Services
import { CandidateServiceApp } from './candidate.serviceApp';
import { ApprovalModule } from '../../approval/shared/approval.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        TranslateModule,
        CandidateRouterModule,
        ApprovalModule,
        AutocompleteModule.forRoot()
    ],
    exports: [],
    declarations: [CandidateComponent, CandidatesComponent, AssignedUserComponent, CandidateDetailsComponent],
    providers: [CandidateServiceApp],
})

export class CandidateModule {
}
