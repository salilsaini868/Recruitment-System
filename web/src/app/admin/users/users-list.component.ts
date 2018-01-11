import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserViewModel } from '../../services/swagger-generated/models/UserViewModel';
import { UserService } from './shared/user.service';

@Component({
    selector: 'users-list',
    templateUrl: 'users-list.component.html'
})

export class UsersListComponent implements OnInit {

    users: UserViewModel[] = [] as UserViewModel[];

    constructor(private userService: UserService, private router: Router) {
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
        this.router.navigate(['users']);
    }

    updateUser(userId){
        this.router.navigate(['users', userId]);
    }

    deleteUser(userId){

    }
}
