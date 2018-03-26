import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

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
        ApprovalModule
    ],
    exports: [],
    declarations: [CandidateComponent, CandidatesComponent, AssignedUserComponent, CandidateDetailsComponent],
    providers: [CandidateServiceApp],
})

export class CandidateModule {
}
