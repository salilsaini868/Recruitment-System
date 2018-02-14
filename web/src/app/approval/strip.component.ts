import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ApprovalServiceApp } from './shared/approval.serviceApp';;

@Component({
  selector: 'app-approvalstrip',
  templateUrl: 'strip.component.html'
})

export class StripComponent implements OnInit {
  approvalEvents = [];
  currentEventClicked = null;
  @Input() approvalType: number;

  constructor(private router: Router, private approvalServiceApp: ApprovalServiceApp) {
  }

  ngOnInit() {
    this.getAllApprovalEvents();
  }

  getAllApprovalEvents() {
    // debugger;
    this.approvalServiceApp.getApprovalEventsById(this.approvalType).subscribe((data) => {
      this.approvalEvents = data.body;
      console.log(this.approvalEvents);
    });
  }

  onApprovalEventClick(approvalEvent) {
    // TODO : apply check for role permission; if allowed then allowed else return
    this.currentEventClicked = approvalEvent;
  }

  onApprovalActionClick(approvalActions) {
    // TODO : Save the page state/data to database
  }

}
