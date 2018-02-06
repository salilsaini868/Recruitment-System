import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-leftsidebar',
    templateUrl: './leftSideBar.component.html',
    styleUrls: ['leftSideBar.scss']
})

export class LeftSideBarComponent implements OnInit {
    isToggle: boolean = true;
    constructor() {}
    ngOnInit(): void {
    }

}

