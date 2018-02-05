import { ChangepasswordComponent } from './../../detail/changepassword.component';
import { HeaderComponent } from './../../shared/header/header.component';

export const AppRoutes: any = [
    { path: "", component: ChangepasswordComponent },
    { path: "detail", component: ChangepasswordComponent }
];

export const AppComponents: any = [
    ChangepasswordComponent,
    HeaderComponent
];