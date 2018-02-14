import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';

import { ApprovalServiceApp } from './shared/approval.serviceApp';
import { AppConstants } from '../shared/constant/constant.variable';
import { isNullOrUndefined } from 'util';
import { ApprovalType } from '../app.enum';

@Component({
  selector: 'app-approvalstrip',
  templateUrl: 'strip.component.html',
  styleUrls: ['strip.component.css']
})

export class StripComponent implements OnInit {
  approvalEvents = [];
  currentEventClicked = null;
  @Input() approvalType: number;
  approvalUserTypes: any;

  constructor(private router: Router, private approvalServiceApp: ApprovalServiceApp) {
  }

  ngOnInit() {
    this.getAllApprovalEvents();
    this.getUserApprovalRole();
  }

  getAllApprovalEvents() {
    debugger;
    this.approvalServiceApp.getApprovalEventsById(this.approvalType).subscribe((data) => {
      this.approvalEvents = data.body;
      console.log(this.approvalEvents);
    });
  }

  getUserApprovalRole() {
    let tokenPayload = '';
    const token = localStorage.getItem(AppConstants.AuthToken);
    if (!isNullOrUndefined(token)) { tokenPayload = decode(token); }
    this.approvalUserTypes = JSON.parse(tokenPayload[AppConstants.ApprovalTypeRole]);
  }

  isDisabled(approvalEventId) {
    const approval = ApprovalType[this.approvalType];
    const userApprovalEventTypes = this.approvalUserTypes[approval].split(',');
    if (userApprovalEventTypes.find(t => t === approvalEventId.toString())) {
      return false;
    }
    return true;
  }

  onApprovalEventClick(approvalEvent) {
    // TODO : apply check for role permission; if allowed then allowed else return
    this.currentEventClicked = approvalEvent;
  }

  onApprovalActionClick(approvalActions) {
    // TODO : Save the page state/data to database
  }

}
