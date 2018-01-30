import { Component, OnInit } from '@angular/core';
declare var jQuery: any; 

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

    toggleLeft(){
        if(!jQuery('.side-bar-main').hasClass("side-bar")) {
            jQuery('.side-bar-main').toggleClass("side-left");
            jQuery('.side-bar-main').toggleClass("wrap-gap");
        } 
        
    }

} 

