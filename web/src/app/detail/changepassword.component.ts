import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HeaderComponent } from './../shared/header/header.component';


@Component({
    selector: 'app-changepassword',
    templateUrl: 'changepassword.component.html'
})
export class ChangepasswordComponent implements OnInit{

    constructor(private router: Router) { 
        
    }

ngOnInit(){
}
    goBack() {
        this.router.navigate(['Dashboard']);
    }

}