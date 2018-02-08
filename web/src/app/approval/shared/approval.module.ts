import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';

// Module
import { SharedModule } from '../../shared/shared.module';
import { ApprovalRouterModule } from './approval.route';

// Service
import { ApprovalServiceApp } from './approval.serviceApp';

// Components
import { StripComponent } from '../strip.component';

@NgModule({
  imports: [
    FormsModule,
    TranslateModule,
    BrowserModule,
    SharedModule,
    ApprovalRouterModule
  ],
  exports: [StripComponent],
  declarations: [StripComponent],
  providers: [ApprovalServiceApp],
})

export class ApprovalModule {
}
