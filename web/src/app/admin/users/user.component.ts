import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RoleViewModel } from '../../shared/customModels/role-view-model';
import { UserServiceApp } from './shared/user.serviceApp';
import { isNullOrUndefined } from 'util';
import { UserModel } from '../../shared/customModels/user-model';
import { RoleServiceApp } from './shared/role.serviceApp';
import { DisplayMessageService } from '../../shared/toastr/display.message.service';
import { Status } from '../../app.enum';
import { TranslateService } from '@ngx-translate/core';
import { UtilityService } from '../../shared/utility/utility.service';
import { Users } from '../../webapi/models/users';

@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html',
    styleUrls: ['shared/user.scss']
})

export class UserComponent implements OnInit {

    userModel: UserModel = {} as UserModel;
    users: UserModel[] = [] as UserModel[];
    roles: RoleViewModel[] = [] as RoleViewModel[];
    submitted = false;
    defaultOption: any;
    isEmailExists = false;
    isUserExists = false;

    constructor(private userServiceApp: UserServiceApp, private route: ActivatedRoute, private userService: UserServiceApp,
        private router: Router, private roleServiceApp: RoleServiceApp, private displayMessage: DisplayMessageService,
        private translateService: TranslateService, private utilityService: UtilityService) {
    }

    ngOnInit() {
        this.setDefaultOption();
        this.intializeMethods();

    }

    intializeMethods() {
        this.getAllRole();
        this.getUserById();
        this.getAllUsers();
    }

    setDefaultOption() {
        this.translateService.get('COMMON.SELECTDEFAULT').subscribe(
            (data) => {
                this.defaultOption = data;
            }
        );
    }

    getAllRole() {
        this.roleServiceApp.getAllRoles().subscribe(
            (data) => {
                this.roles = data.body;
                const role = this.defaultOption;
                this.roles.splice(0, 0, { roleId: 0, name: role });
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
                            this.userModel.password = this.utilityService.decrypt(this.userModel.password);
                            this.userModel.confirmPassword = this.userModel.password;
                        }
                    }
                );
            }
        });
    }

    checkUserNameExists() {
        const userName = this.userModel.userName;
        const user = this.users.find(x => x.userName === userName);
        if (isNullOrUndefined(user)) {
            this.isUserExists = false;
        } else {
            this.isUserExists = true;
        }
    }
    checkUserEmailExists() {
        const email = this.userModel.email;
        const userEmail = this.users.find(u => u.email === email);
        if (isNullOrUndefined(userEmail)) {
            this.isEmailExists = false;
        } else {
            this.isEmailExists = true;
        }
    }

    onSubmit(userForm) {
        this.submitted = true;
        if (userForm.valid) {
            if (this.userModel.password === this.userModel.confirmPassword) {
                if (isNullOrUndefined(this.userModel.userId)) {
                    this.userModel.password = this.utilityService.encrypt(this.userModel.password);
                    this.userModel.confirmPassword = this.userModel.password;
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
    getAllUsers() {
        this.userService.getAllUsers().subscribe(
            (data) => {
                if (data.status === Status.Success) {
                    this.users = data.body;
                }
            }
        );
    }

}

