import { Routes, RouterModule } from '@angular/router';

// Component

import { RoleGuardService } from '../../shared/index.shared';
import { OpeningComponent } from '../opening.component';
import { OpeningsComponent } from '../openings.component';

const OPENING_ROUTES: Routes = [
    {
        path: 'opening',
        component: OpeningComponent,
        canActivate: [RoleGuardService],
        data: { expectedRole: 'Admin' }
    },
    {
        path: 'opening/:openingId',
        component: OpeningComponent,
        canActivate: [RoleGuardService],
        data: { expectedRole: 'Admin' }
    },
    {
        path: 'openings',
        component: OpeningsComponent,
        canActivate: [RoleGuardService],
        data: { expectedRole: 'Admin' }
    }
];

export const OpeningRouterModule = RouterModule.forRoot(OPENING_ROUTES, { useHash: false });
