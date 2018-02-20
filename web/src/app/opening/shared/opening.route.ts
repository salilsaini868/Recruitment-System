import { Routes, RouterModule } from '@angular/router';

// Component

import { RoleGuardService } from '../../shared/index.shared';
import { OpeningComponent, OpeningsComponent } from '../index.opening';

const OPENING_ROUTES: Routes = [
    {
        path: 'opening',
        component: OpeningComponent,
        canActivate: [RoleGuardService],
        data: { expectedRole: ['Sr.HR', 'Manager'] }
    },
    {
        path: 'opening/:openingId',
        component: OpeningComponent,
        canActivate: [RoleGuardService],
        data: { expectedRole: ['Sr.HR', 'Manager'] }
    },
    {
        path: 'openings',
        component: OpeningsComponent,
        canActivate: [RoleGuardService],
        data: { expectedRole: ['Sr.HR', 'Manager'] }
    }
];

export const OpeningRouterModule = RouterModule.forRoot(OPENING_ROUTES, { useHash: false });
