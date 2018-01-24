import { Routes, RouterModule } from '@angular/router';

// Components
import {
  DashboardComponent
} from '../index.dashboard';

const Dashboard_ROUTES: Routes = [
  {
    path: 'Dashboard',
    component: DashboardComponent
  }
];

export let DashboardRouterModule = RouterModule.forRoot(Dashboard_ROUTES, { useHash: false });
