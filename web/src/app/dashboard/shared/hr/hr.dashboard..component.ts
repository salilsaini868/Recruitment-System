import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.dashboard.component.html',
  styleUrls: ['hr.dashboard.scss']
})

export class HrDashboardComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
  }
}
