import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangepasswordComponent } from './../changepassword.component';
import { HeaderComponent } from './../../shared/header/header.component';
import { DetailRouterModule } from './detail.route';

@NgModule({
    declarations: [
        ChangepasswordComponent,
       HeaderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        DetailRouterModule
        
    ],
    providers: []
})
export class AppModule { }