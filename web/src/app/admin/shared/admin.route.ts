
import { Routes, RouterModule } from '@angular/router';

// Components
import {
  AdminDashboardComponent, QualificationComponent, QualificationsComponent,
  SkillComponent, SkillsComponent
} from '../index.admin';


const ADMIN_ROUTES: Routes = [
  {
    path: 'AdminDashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'Qualification',
    component: QualificationComponent
  },
  {
    path: 'Qualifications',
    component: QualificationsComponent
  },
  {
    path: 'Skill',
    component: SkillComponent
  },
  {
    path: 'Skills',
    component: SkillsComponent
  }
];

export let AdminRouterModule = RouterModule.forRoot(ADMIN_ROUTES, { useHash: false });