import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { AppComponents } from "./../shared/detail.router";
import { ChangepasswordComponent } from './../changepassword.component';

@NgModule({
    declarations: [
        ChangepasswordComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    providers: [],
    bootstrap: [ChangepasswordComponent]
})
export class AppModule { }