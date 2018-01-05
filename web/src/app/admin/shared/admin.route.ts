import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';

// Components
import {
  AdminDashboardComponent, QualificationComponent, QualificationsComponent,
  SkillComponent, SkillsComponent, UserComponent
} from '../index.admin';


const ADMIN_ROUTES: Routes = [
  {
    path: 'AdminDashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Qualification',
    component: QualificationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Qualifications',
    component: QualificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Skill',
    component: SkillComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Skills',
    component: SkillsComponent,
    canActivate: [AuthGuard]
  }
];

export let AdminRouterModule = RouterModule.forRoot(ADMIN_ROUTES, { useHash: false });