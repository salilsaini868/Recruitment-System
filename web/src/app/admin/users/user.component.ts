import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserViewModel } from '../../webapi/models/user-view-model';
import { RoleViewModel } from '../../shared/customModels/role-view-model';
import { UserServiceApp } from './shared/user.serviceApp';
import { Params } from '@angular/router/src/shared';
import { isNullOrUndefined, error } from 'util';

@Component({
    selector: 'user',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {

    userModel: UserViewModel = {} as UserViewModel;
    roles: RoleViewModel[] = [] as RoleViewModel[];

    constructor(private userService: UserServiceApp, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.intializeMethods();
    }

    intializeMethods() {
        this.getAllRole();
        this.getUserById();
    }

    getAllRole() {
        this.userService.getAllRoles().subscribe(
            (data) => {
                this.roles = data.body;
                console.log(data.body);
                console.log(this.roles);
            }
        );
    }

    showUsersList() {
        this.router.navigate(['Userslist']);
    }

    getUserById() {
        this.route.params.subscribe((params: Params) => {
            let userId = params['userId'];
            if (!isNullOrUndefined(userId)) {
                this.userService.getUserById(userId).subscribe(
                    (data) => {
                        this.userModel = data.body;
                        console.log(this.userModel);
                        console.log(data.body);
                    }
                );
            }
        });
    }

    onSubmit(userForm) {
        if (userForm.valid) {
            if (isNullOrUndefined(this.userModel.userId)) {
                this.userService.createUser(this.userModel).subscribe(
                    (data) => {
                        console.log(data.body);
                        this.showUsersList();
                    }
                );
            } else {
                this.userService.updateUser(this.userModel).subscribe(
                    (data) => {
                        console.log(data.body);
                        this.showUsersList();
                    }
                );
            }
        }
    }

}
