import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RoleViewModel } from '../../shared/customModels/role-view-model';
import { UserServiceApp } from './shared/user.serviceApp';
import { isNullOrUndefined, error } from 'util';
import { UserModel } from '../../shared/customModels/user-model';
import { RoleServiceApp } from './shared/role.serviceApp';
import { DisplayMessageService } from '../../shared/toastr/display.message.service';
import { Status } from '../../app.enum';

@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html',
    styleUrls: ['shared/user.scss']
})

export class UserComponent implements OnInit {

    userModel: UserModel = {} as UserModel;
    roles: RoleViewModel[] = [] as RoleViewModel[];

    constructor(private userServiceApp: UserServiceApp, private route: ActivatedRoute,
        private router: Router, private roleServiceApp: RoleServiceApp, private displayMessage: DisplayMessageService) {
    }

    ngOnInit() {
        this.intializeMethods();
    }

    intializeMethods() {
        this.getAllRole();
        this.getUserById();
    }

    getAllRole() {
        this.roleServiceApp.getAllRoles().subscribe(
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
            const userId = params['userId'];
            if (!isNullOrUndefined(userId)) {
                this.userServiceApp.getUserById(userId).subscribe(
                    (data) => {
                        if (data.status === Status.Success) {
                            this.userModel = data.body;
                            this.userModel.confirmPassword = this.userModel.password;
                        }
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
                this.displayMessage.showWarning('USER.PASSWORDMISMATCH');
            }
        }
    }
}

