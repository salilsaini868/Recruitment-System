import { NgModule } from '@angular/core';

// Route
import { AdminRouterModule } from './admin.route';

// Components
import {
  AdminDashboardComponent, QualificationsComponent, SkillsComponent
} from '../index.admin';

// Module
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    AdminRouterModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    AdminDashboardComponent, QualificationsComponent, SkillsComponent
  ],
  providers: [],
})

export class AdminModule {
}
