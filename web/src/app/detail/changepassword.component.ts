import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-page1',
    templateUrl: './page1.component.html',
    styleUrls: ['./page1.component.css']
})
export class ChangepasswordComponent {

    constructor(private router: Router) { }

    goBack() {
       // this.router.back();
    }

}