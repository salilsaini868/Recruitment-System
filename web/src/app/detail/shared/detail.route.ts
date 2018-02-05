import { Routes, RouterModule } from '@angular/router';

// Component
import { ChangepasswordComponent } from './../../detail/changepassword.component';
import { HeaderComponent } from './../../shared/header/header.component';

const DETAIL_ROUTES: Routes = [
    {
        path: '',
        component: ChangepasswordComponent
    },
    {
        path: 'header',
        component: HeaderComponent
    }
];

export const DetailRouterModule = RouterModule.forRoot(DETAIL_ROUTES, { useHash: false });
