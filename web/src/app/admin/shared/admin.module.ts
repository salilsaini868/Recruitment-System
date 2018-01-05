import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { SkillsService } from '../skills/shared/skills.service';

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
    BrowserModule, AdminRouterModule,FormsModule,ReactiveFormsModule,
    TranslateModule.forRoot(),
    SharedModule
  ],
  exports: [],
  declarations: [
    AdminDashboardComponent, QualificationsComponent, SkillsComponent
  ],
  providers: [SkillsService],
  bootstrap: [],
})

export class AdminModule {
}
