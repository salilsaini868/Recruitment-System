import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserViewModel } from '../../webapi/models/user-view-model';
import { UserServiceApp } from './shared/user.serviceApp';

@Component({
    selector: 'users-list',
    templateUrl: 'users-list.component.html'
})

export class UsersListComponent implements OnInit {

    users: UserViewModel[] = [] as UserViewModel[];

    constructor(private userService: UserServiceApp, private router: Router) {
    }

    ngOnInit() {
       this.getAllUsers();
    }

    getAllUsers(){
        this.userService.getAllUsers().subscribe(
            (data) => {
                this.users = data.body;
                console.log(this.users);
            }
        )
    }

    addUser(){
        this.router.navigate(['Users']);
    }

    updateUser(userId){
        this.router.navigate(['Users', userId]);
    }

    deleteUser(userId){

    }
}
