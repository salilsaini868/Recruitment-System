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
    passwordMismatchError: String;

    constructor(private userServiceApp: UserServiceApp, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.intializeMethods();
    }

    intializeMethods() {
        this.getAllRole();
        this.getUserById();
    }

    getAllRole() {
        this.userServiceApp.getAllRoles().subscribe(
            (data) => {
                this.roles = data.body;
            }
        );
    }

    showUsersList() {
        this.router.navigate(['Users']);
    }

    getUserById() {
        this.route.params.subscribe((params: Params) => {
            let userId = params['userId'];
            if (!isNullOrUndefined(userId)) {
                this.userServiceApp.getUserById(userId).subscribe(
                    (data) => {
                        this.userModel = data.body;
                        this.userModel.confirmPassword = this.userModel.password;
                    }
                );
            }
        });
    }

    onSubmit(userForm) {
        if (userForm.valid) {
            if (this.userModel.password === this.userModel.confirmPassword) {
                if (isNullOrUndefined(this.userModel.userId)) {
                    this.userServiceApp.createUser(this.userModel).subscribe(
                        (data) => {
                            this.showUsersList();
                        }
                    );
                } else {
                    this.userServiceApp.updateUser(this.userModel).subscribe(
                        (data) => {
                            this.showUsersList();
                        }
                    );
                }
            } else {
                this.passwordMismatchError = "Password Doesnot Match";
            }
        }
    }

}
