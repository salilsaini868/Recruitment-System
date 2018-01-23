import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApprovalServiceApp } from './shared/approval.serviceApp';

@Component({
  selector: 'app-approvalstrip',
  templateUrl: 'strip.component.html'
})

export class StripComponent implements OnInit {
  approvalEvents = [];
  currentEventClicked = null;
  constructor(private router: Router, private approvalServiceApp: ApprovalServiceApp) {
  }

  ngOnInit() {
    this.getAllApprovalEvents();
  }

  getAllApprovalEvents() {
    this.approvalServiceApp.getAllApprovalEvents(1).subscribe((data) => {
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
