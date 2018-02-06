import { Routes, RouterModule } from '@angular/router';

// Component
import { ChangepasswordComponent } from './../../detail/changepassword.component';
import { RoleGuardService } from '../../shared/index.shared';


const DETAIL_ROUTES: Routes = [
    {
        path: 'changepassword',
        component: ChangepasswordComponent,
        canActivate: [RoleGuardService],
        data: { expectedRole: 'Admin' }
    }
];

export const DetailRouterModule = RouterModule.forRoot(DETAIL_ROUTES, { useHash: false });
