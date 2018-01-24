import { Routes, RouterModule } from '@angular/router';

// Components
import {
  AdminDashboardComponent, QualificationsComponent,
  SkillsComponent, UserComponent, UsersComponent
} from '../index.admin';

import { RoleGuardService } from '../../shared/index.shared';


const ADMIN_ROUTES: Routes = [
  {
    path: 'Dashboard',
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
  },
  {
    path: 'User',
    component: UserComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: 'Admin' }
  },
  {
    path: 'User/:userId',
    component: UserComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: 'Admin' }
  },
  {
    path: 'Users',
    component: UsersComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: 'Admin' }
  }
];

export let AdminRouterModule = RouterModule.forRoot(ADMIN_ROUTES, { useHash: false });
