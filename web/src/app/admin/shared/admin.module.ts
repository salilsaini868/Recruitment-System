import { NgModule } from '@angular/core';

// Route
import { AdminRouterModule } from './admin.route';

// Components
import {
  AdminDashboardComponent, QualificationsComponent,
  SkillComponent, SkillsComponent, UserComponent
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
    AdminDashboardComponent, QualificationsComponent,
    SkillComponent, SkillsComponent, UserComponent
  ],
  providers: [LoginServiceApp],
})

export class AdminModule {
}
