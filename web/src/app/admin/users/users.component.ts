import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserViewModel } from '../../webapi/models/user-view-model';
import { UserServiceApp } from './shared/user.serviceApp';
import { debuglog } from 'util';
import { Status } from '../../app.enum';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
    styleUrls: ['shared/user.scss']
})

export class UsersComponent implements OnInit {

    users: UserViewModel[] = [] as UserViewModel[];

    constructor(private userService: UserServiceApp, private router: Router) {
    }

    ngOnInit() {
       this.getAllUsers();
    }

    getAllUsers() {
        this.userService.getAllUsers().subscribe(
            (data) => {
                if (data.status === Status.Success) {
                    this.users = data.body;
                }
            }
        );
    }

    addUser() {
        this.router.navigate(['User']);
    }

    updateUser(userId) {
        this.router.navigate(['User', userId]);
    }

    deleteUser(userId) {

    }
}
