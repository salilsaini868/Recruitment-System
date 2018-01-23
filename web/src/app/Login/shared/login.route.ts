import { Routes, RouterModule } from '@angular/router';

// Component
import { LoginComponent } from '../login.component';

const LOGIN_ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
];

export const LoginRouterModule = RouterModule.forRoot(LOGIN_ROUTES, { useHash: false });
