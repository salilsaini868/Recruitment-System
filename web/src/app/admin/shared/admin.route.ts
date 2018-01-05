import { Routes, RouterModule } from '@angular/router';

// Components
import {
  AdminDashboardComponent, QualificationsComponent, SkillsComponent
} from '../index.admin';

import { RoleGuardService } from '../../shared/index.shared';


const ADMIN_ROUTES: Routes = [
  {
    path: 'AdminDashboard',
    component: AdminDashboardComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: 'Admin' }
  },
  {
    path: 'Qualifications',
    component: QualificationsComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: 'Admin' }
  },
  {
    path: 'Skills',
    component: SkillsComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: 'Admin' }
  }
];

export let AdminRouterModule = RouterModule.forRoot(ADMIN_ROUTES, { useHash: false });