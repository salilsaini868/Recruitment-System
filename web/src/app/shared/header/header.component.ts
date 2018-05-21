import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../constant/constant.variable';
import * as $ from 'jquery/dist/jquery.min.js';
import { isNullOrUndefined } from 'util';
import decode from 'jwt-decode';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    name: string;
    firstName: any;
    lastName: any;

    constructor(private router: Router) { }
    ngOnInit() {
        let tokenPayload = '';
        const token = localStorage.getItem(AppConstants.AuthToken);
        if (!isNullOrUndefined(token)) { tokenPayload = decode(token); }
        this.name = tokenPayload[AppConstants.NameClaim];
        const names = this.name.split(' ');
        this.firstName = names[0].charAt(0);
        this.lastName = names[1].charAt(0);
    }

    logout() {
        localStorage.removeItem(AppConstants.AuthToken);
        localStorage.clear();
        this.router.navigate(['login']);
    }

    toggleLeft() {
        if (!$('.side-bar-main').hasClass('side-bar')) {
            $('.side-bar-main').toggleClass('side-left', 'slow');
        }

        if (!$('div').hasClass('.content-wrapper')) {
            $('div.content-wrapper').toggleClass('wrap-left', 'slow');
        }
    }
}
