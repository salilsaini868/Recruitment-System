import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';

import { ApprovalServiceApp } from './shared/approval.serviceApp';
import { AppConstants } from '../shared/constant/constant.variable';
import { isNullOrUndefined } from 'util';
import { ApprovalType, Status } from '../app.enum';
import { OpeningViewModel, OpeningAndApprovalViewModel, ApprovalTransactionViewModel } from '../webapi/models';
import { OpeningServiceApp } from '../opening/shared/opening.serviceApp';
import { ApprovalEventViewModel } from '../shared/customModels/approval-event-view-model';

@Component({
  selector: 'app-approvalstrip',
  templateUrl: 'strip.component.html',
  styleUrls: ['strip.component.css']
})

export class StripComponent implements OnInit {
  approvalEvents: ApprovalEventViewModel[] = [] as ApprovalEventViewModel[];
  currentEventClicked: ApprovalEventViewModel = {} as ApprovalEventViewModel;
  openingAndApprovalEventModel: OpeningAndApprovalViewModel = {} as OpeningAndApprovalViewModel;
  @Input() approvalTransaction: ApprovalTransactionViewModel = {} as ApprovalTransactionViewModel;
  @Input() approvalType: number;
  @Input() openingModel: OpeningViewModel = [] as OpeningViewModel;
  approvalUserTypes: any;

  constructor(private router: Router, private approvalServiceApp: ApprovalServiceApp, private openingServiceApp: OpeningServiceApp) {
  }

  ngOnInit() {
    this.currentEventClicked = null;
    this.getAllApprovalEvents();
    this.getUserApprovalRole();
  }

  getAllApprovalEvents() {
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
    debugger;
    // TODO : apply check for role permission; if allowed then allowed else return
    this.currentEventClicked = approvalEvent;
  }

  showOpeningList() {
    this.router.navigate(['openings']);
  }

  onApprovalActionClick(approvalActions) {
    debugger;
    // TODO : Save the page state/data to database
    this.approvalTransaction.eventOrderNumber = this.approvalTransaction.nextEventOrderNumber;
    this.approvalTransaction.approvalActionId = approvalActions.approvalActionId;
    if (this.currentEventClicked.approvalEventOrder === this.approvalTransaction.nextEventOrderNumber ||
      (isNullOrUndefined(this.approvalTransaction.nextEventOrderNumber)
      )) {
      const approvalEventOrders = this.approvalEvents.map(x => x.approvalEventOrder);
      if (this.currentEventClicked.approvalEventOrder === Math.min.apply(null, approvalEventOrders)) {
        this.openingAndApprovalEventModel.openingViewModel = this.openingModel;
        if (this.isValidate(this.openingModel)) {
          if (isNullOrUndefined(this.openingModel.openingId)) {
            this.openingAndApprovalEventModel.approvalTransactionViewModel = this.currentEventClicked;
            this.openingServiceApp.CreateOpening(this.openingAndApprovalEventModel).subscribe(
              (data) => {
                debugger;
                if (data.status === Status.Success) {
                debugger;
                  this.showOpeningList();
                } else {

                }
              });
          } else {
            this.openingAndApprovalEventModel.approvalTransactionViewModel = this.approvalTransaction;
            this.openingServiceApp.UpdateOpening(this.openingAndApprovalEventModel).subscribe(
              (data) => {
                if (data.status === Status.Success) {
                  this.showOpeningList();
                } else {

                }
              });
          }
        }
      } else {
        const approvalActionIds = this.currentEventClicked.approvalActions.map(x => x.approvalActionId);
        if (approvalActions.approvalActionId === Math.min.apply(null, approvalActionIds)) {
          this.approvalTransaction.nextEventOrderNumber -= 1;
        } else {
          this.approvalTransaction.nextEventOrderNumber += 1;
        }
        if (this.approvalTransaction.nextEventOrderNumber <= this.approvalEvents.length) {
          this.approvalServiceApp.updateApprovalTransaction(this.approvalTransaction).subscribe(
            (data) => {
              if (data.status === Status.Success) {
                this.showOpeningList();
              } else {

              }
            });
        } else {
          this.showOpeningList();
        }
      }
    }

  }

  isValidate(opening: OpeningViewModel): boolean {
    debugger;
    if (isNullOrUndefined(opening)) {
      return false;
    } else if (opening.primarySkillTypes.length <= 0) {
      return false;
    } else if (this.SameSkillinBothSkillType(opening)) {
      return false;
    }
    return true;
  }

  SameSkillinBothSkillType(opening): boolean {
    const sameSkill = [];
    opening.primarySkillTypes.forEach(skill => {
      opening.secondarySkillTypes.forEach(value => {
        if (skill.skillId === value.skillId) {
          sameSkill.push(skill);
        }
      });
    });
    if (sameSkill.length > 0) { return true; }
    return false;
  }

}
