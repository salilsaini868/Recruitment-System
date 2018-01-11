/**
 * Created by orjanertkjern on 24/04/2017.
 */

import {Routes, RouterModule} from '@angular/router';
// import {HomeComponent} from './home/home.component';
import {ErrorComponent} from './error/error.component';

import { LoginComponent } from './Login/login.Component';
import { SkillsComponent } from './admin/skills/skills.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '**',
    component: ErrorComponent
  },
];

export let AppRouterModule = RouterModule.forRoot(APP_ROUTES, {useHash: false});

