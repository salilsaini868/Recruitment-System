import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { SkillsServiceApp } from '../skills/shared/skills.serviceApp';
=======
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
>>>>>>> develop

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

@NgModule({
  imports: [
    FormsModule,
    TranslateModule,
    BrowserModule,
    SharedModule,
    AdminRouterModule
  ],
  exports: [],
  declarations: [
    AdminDashboardComponent, QualificationsComponent,
    SkillComponent, SkillsComponent, UserComponent, UsersComponent
  ],
  bootstrap: [],
  providers: [LoginServiceApp, SkillsServiceApp, UserServiceApp],
})

export class AdminModule {
}
