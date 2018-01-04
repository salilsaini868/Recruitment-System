import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    BrowserModule, AdminRouterModule,FormsModule,ReactiveFormsModule,
    TranslateModule.forRoot()
  ],
  exports: [],
  declarations: [
    AdminDashboardComponent, QualificationComponent, QualificationsComponent,
    SkillComponent, SkillsComponent
  ],
  providers: [],
  bootstrap: [],
})

export class AdminModule {
}
