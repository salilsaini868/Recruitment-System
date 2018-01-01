import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';

// Route
import { AdminRouterModule } from './admin.route';

// Components
import {
  AdminDashboardComponent, QualificationComponent, QualificationsComponent,
  SkillComponent, SkillsComponent
} from '../index.admin';


@NgModule({
  imports: [
    BrowserModule, AdminRouterModule,
    TranslateModule.forRoot()
  ],
  exports: [],
  declarations: [
    AdminDashboardComponent, QualificationComponent, QualificationsComponent,
    SkillComponent, SkillsComponent
  ],
  providers: [],
})

export class AdminModule {
}
