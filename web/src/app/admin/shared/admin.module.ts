import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { SkillsService } from '../skills/shared/skills.serviceApp';

// Route
import { AdminRouterModule } from './admin.route';

// Components
import {
  AdminDashboardComponent, QualificationsComponent, SkillsComponent
} from '../index.admin';

// Module
import { SharedModule } from '../../shared/shared.module';
import { LoginServiceApp } from '../../Login/shared/login.serviceApp';


@NgModule({
  imports: [
    BrowserModule, AdminRouterModule,FormsModule,ReactiveFormsModule,
    TranslateModule.forRoot(),
    SharedModule
  ],
  exports: [],
  declarations: [
    AdminDashboardComponent, QualificationsComponent, SkillsComponent
  ],
  bootstrap: [],
  providers: [LoginServiceApp, SkillsService ],
})

export class AdminModule {
}
