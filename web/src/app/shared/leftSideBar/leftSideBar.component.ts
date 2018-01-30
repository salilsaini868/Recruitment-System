import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'left-sideBar',
    templateUrl: './leftSideBar.component.html',
    styleUrls: ['leftSideBar.scss']
})

export class LeftSideBarComponent implements OnInit {
    isToggle : boolean = true;
    constructor() {}
    ngOnInit(): void {
    }

} 

