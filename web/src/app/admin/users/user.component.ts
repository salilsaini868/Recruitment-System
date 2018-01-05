import { Component, OnInit } from '@angular/core';
import { UserViewModel } from '../../services/swagger-generated/models/UserViewModel';

@Component({
    selector: 'user',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {

    userModel : UserViewModel = {} as UserViewModel;
    constructor() {
    }

    ngOnInit() {
    }

}
