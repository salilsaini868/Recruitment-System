import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Status } from '../../app.enum';

// Models
import { RoleViewModel } from '../../shared/customModels/role-view-model';
import { UserModel } from '../../shared/customModels/user-model';
import { ApprovalEventRoleViewModel } from '../../webapi/models/approval-event-role-view-model';

// Services
import { RoleServiceApp } from '../users/shared/role.serviceApp';
import { UserServiceApp } from '../users/shared/user.serviceApp';
import { DisplayMessageService } from '../../shared/toastr/display.message.service';
import { ApprovalServiceApp } from '../../approval/shared/approval.serviceApp';
import { ApprovalEventModel } from '../../shared/customModels/approval-event-model';
import { TranslateService } from '@ngx-translate/core';
import { UserEventRoleServiceApp } from './shared/usereventrole.serviceApp';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ApprovalModel } from '../../shared/customModels/approval-model';

@Component({
    'selector': 'app-usereventrole',
    'templateUrl': 'usereventrole.component.html'
})

export class UserEventRoleComponent implements OnInit {

    approvalEvents: ApprovalEventModel[] = [] as ApprovalEventModel[];
    approvalEventRoleModel: ApprovalEventRoleViewModel = {} as ApprovalEventRoleViewModel;
    roles: RoleViewModel[] = [] as RoleViewModel[];
    approvalEventRoleModels: ApprovalEventRoleViewModel[] = [] as ApprovalEventRoleViewModel[];
    users: UserModel[] = [];
    approvals: ApprovalModel[] = [];
    approvalId: number;
    defaultOption: any;

    constructor(private approvalServiceApp: ApprovalServiceApp, private msgService: DisplayMessageService,
        private roleServiceApp: RoleServiceApp, private userServiceApp: UserServiceApp,
        private translateService: TranslateService, private userEvetRoleServiceApp: UserEventRoleServiceApp) {

    }

    ngOnInit() {
        this.setDefaultOption();
        this.initializeMethods();
        this.getAllEventRoleModels();
        this.getUsers();
    }

    initializeMethods() {
        this.approvalEventRoleModel.users = [];
        this.getAllApprovals();
        this.getRoles();
    }

    getAllApprovals() {
        this.approvalServiceApp.getApprovals().subscribe(
            (data) => {
                if (data.status === Status.Success) {
                    this.approvals = data.body;
                    const approval = this.defaultOption;
                    this.approvals.splice(0, 0, { approvalId: 0, approvalName: approval });
                } else {
                    this.msgService.showError('Error');
                }
            }
        );
    }

    getAllEventRoleModels() {
        this.userEvetRoleServiceApp.getAllUserEventRole().subscribe(
            (data) => {
                if (data.status === Status.Success) {
                    this.approvalEventRoleModels = data.body;
                } else {
                    this.msgService.showError('Error');
                }
            }
        );
    }

    setDefaultOption() {
        this.translateService.get('COMMON.SELECTDEFAULT').subscribe(
            (data) => {
                this.defaultOption = data;
                this.getApprovalEvents();
            }
        );
    }

    onChangeUsers(user: UserModel, isChecked: boolean) {
        if (isChecked) {
            this.approvalEventRoleModel.users.push(user);
        } else {
            const index = this.approvalEventRoleModel.users.findIndex(x => x.userId === user.userId);
            if (index > -1) { this.approvalEventRoleModel.users.splice(index, 1); }
        }
    }

    getApprovalEvents() {
        if (!isNullOrUndefined(this.approvalId) && (String(this.approvalId) !== '0')) {
            this.approvalServiceApp.getApprovalEventsById(this.approvalId).subscribe(
                (data) => {
                    if (data.status === Status.Success) {
                        this.approvalEvents = data.body;
                        const approvalEvent = this.defaultOption;
                        this.approvalEvents.splice(0, 0, { approvalEventId: 0, approvalEventName: approvalEvent });
                    } else {
                        this.msgService.showError('Error');
                    }
                }
            );
        } else {
            this.approvalEvents = [];
            const approvalEvent = this.defaultOption;
            this.approvalEvents.splice(0, 0, { approvalEventId: 0, approvalEventName: approvalEvent });
        }
    }

    getRoles() {
        this.roleServiceApp.getAllRoles().subscribe(
            (data) => {
                if (data.status === Status.Success) {
                    this.roles = data.body;
                    const role = this.defaultOption;
                    this.roles.splice(0, 0, { roleId: 0, name: role });
                } else {
                    this.msgService.showError('Error');
                }
            }
        );
    }

    getUsers() {
        if (!isNullOrUndefined(this.approvalEventRoleModel.roleId)) {
            this.userServiceApp.getUsersByRole(this.approvalEventRoleModel.roleId).subscribe(
                (data) => {
                    if (data.status === Status.Success) {
                        this.users = data.body;
                    } else {
                        this.msgService.showError('Error');
                    }
                }
            );
        }
    }

    onSubmit(eventRoleForm) {
        if (eventRoleForm.valid) {
            if (this.approvalEventRoleModel.users.length > 0) {
                this.userEvetRoleServiceApp.CreateUserEventRole(this.approvalEventRoleModel).subscribe(
                    (data) => {
                        if (data.status === Status.Success) {
                            this.getAllEventRoleModels();
                        } else {
                            this.msgService.showError('Error');
                        }
                        this.reset();
                    }
                );
            } else {
                this.msgService.showWarning('EVENTROLE.MANDATORY');
            }
        }
    }

    reset() {
        this.users = [];
        this.approvalEvents = [];
        this.initializeMethods();
    }

}
