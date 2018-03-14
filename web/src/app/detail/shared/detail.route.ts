import { Routes, RouterModule } from '@angular/router';

// Component
import { ChangepasswordComponent } from './../../detail/changepassword.component';
import { RoleGuardService } from '../../shared/index.shared';
import { AuthService } from '../../shared/guards/auth.service';


const DETAIL_ROUTES: Routes = [
    {
        path: 'changepassword',
        component: ChangepasswordComponent,
        canActivate: [RoleGuardService]
    }
];

export const DetailRouterModule = RouterModule.forRoot(DETAIL_ROUTES, { useHash: false });
