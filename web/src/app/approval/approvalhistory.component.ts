import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ApprovalServiceApp } from './shared/approval.serviceApp';
import { ApprovalResponseModel } from '../shared/customModels/approvel-response.model';


@Component({
    selector: 'app-approvalhistory',
    templateUrl: 'approvalhistory.component.html',
    styleUrls:['./shared/strip.scss'],
})

export class ApprovalhistoryComponent implements OnInit {
    approvalResponseModel: ApprovalResponseModel = {} as ApprovalResponseModel;

    constructor(private router: Router, private approvalServiceApp: ApprovalServiceApp, private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.getApprovalDetails();
    }
    getApprovalDetails() {
        this.route.params.subscribe((params: Params) => {
            const openingId = params['openingId'];
            this.approvalServiceApp.getApprovalDetails(openingId).subscribe(
                (data) => {
                    this.approvalResponseModel = data.body;
                    if (data.status === 2) {
                    }
                }
            );
        });
    }
}
