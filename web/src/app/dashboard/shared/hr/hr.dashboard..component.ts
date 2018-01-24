import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.dashboard.component.html'
})

export class HrDashboardComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
