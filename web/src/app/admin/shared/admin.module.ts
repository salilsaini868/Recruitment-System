import { NgModule } from '@angular/core';

// Route
import { AdminRouterModule } from './admin.route';

// Components
import {
  AdminDashboardComponent, QualificationComponent, QualificationsComponent,
  SkillComponent, SkillsComponent, UserComponent
} from '../index.admin';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  imports: [
    AdminRouterModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    AdminDashboardComponent, QualificationComponent, QualificationsComponent,
    SkillComponent, SkillsComponent, UserComponent
  ],
  providers: [],
})

export class AdminModule {
}
