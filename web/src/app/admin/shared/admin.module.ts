import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';

// Route
import { AdminRouterModule } from './admin.route';

// Service
import { UserServiceApp } from '../users/shared/user.serviceApp';
import { QualificationsServiceApp } from '../qualifications/shared/qualifications.serviceApp';
import { SkillsServiceApp } from '../skills/shared/skills.serviceApp';

// Components
import {
  QualificationsComponent, SkillsComponent, UserComponent, UsersComponent
} from '../index.admin';

// Module
import { SharedModule } from '../../shared/shared.module';
import { LoginServiceApp } from '../../Login/shared/login.serviceApp';
import { ApprovalModule } from '../../approval/shared/approval.module';

@NgModule({
  imports: [
    FormsModule,
    TranslateModule,
    BrowserModule,
    SharedModule,
    AdminRouterModule, ApprovalModule
  ],
  exports: [],
  declarations: [
    QualificationsComponent, SkillsComponent, UserComponent, UsersComponent
  ],
  bootstrap: [],
  providers: [LoginServiceApp, SkillsServiceApp, UserServiceApp, QualificationsServiceApp],
})

export class AdminModule {
}
