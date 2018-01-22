import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';

// Route
import { AdminRouterModule } from './admin.route';

// Service
import { UserServiceApp } from '../users/shared/user.serviceApp';

// Components
import {
  AdminDashboardComponent, QualificationsComponent,
  SkillComponent, SkillsComponent, UserComponent, UsersComponent
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
    AdminDashboardComponent, QualificationsComponent,
    SkillComponent, SkillsComponent, UserComponent, UsersComponent
  ],
  providers: [LoginServiceApp, UserServiceApp],
})

export class AdminModule {
}
