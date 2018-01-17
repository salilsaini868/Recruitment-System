import { Routes, RouterModule } from '@angular/router';

// Component
import { LoginComponent } from '../login.component';
import { RoleGuardService } from '../../shared/index.shared';

const LOGIN_ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
];

export const LoginRouterModule = RouterModule.forRoot(LOGIN_ROUTES, { useHash: false });
