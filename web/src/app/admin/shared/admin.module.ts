import { NgModule } from '@angular/core';

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
    AdminRouterModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    AdminDashboardComponent, QualificationsComponent, SkillsComponent
  ],
  providers: [LoginServiceApp],
})

export class AdminModule {
}
