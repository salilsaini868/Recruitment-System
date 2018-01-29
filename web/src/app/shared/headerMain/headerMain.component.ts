import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../constant/constant.variable';

@Component({
    selector: 'app-headermain',
    templateUrl: './headerMain.component.html'
})

export class HeaderMainComponent implements OnInit {

    constructor(private router: Router) { }
    ngOnInit(): void {
    }

    logout() {
        localStorage.removeItem(AppConstants.AuthToken);
        localStorage.clear();
        this.router.navigate(['login']);
    }
}
