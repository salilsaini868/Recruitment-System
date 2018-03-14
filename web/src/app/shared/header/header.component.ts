import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppConstants } from '../constant/constant.variable';
import * as $ from 'jquery/dist/jquery.min.js';
import { ChangepasswordComponent } from './../../detail/changepassword.component';
import { DetailModule } from './../../detail/shared/detail.module';


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
        if (!$('.side-bar-main').hasClass("side-bar")) {
            $('.side-bar-main').toggleClass("side-left", 'slow');
        }

        if (!$('div').hasClass(".content-wrapper")) {
            $('div.content-wrapper').toggleClass("wrap-left", 'slow');
        }
    }
}
