import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../constant/constant.variable';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    constructor(private router: Router) { }
    ngOnInit(): void {
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
