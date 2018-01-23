import { Routes, RouterModule } from '@angular/router';

// Components

// Role guard
import { RoleGuardService } from '../../shared/index.shared';


const Approval_ROUTES: Routes = [];

export let ApprovalRouterModule = RouterModule.forRoot(Approval_ROUTES, { useHash: false });
