import { Component, OnInit } from '@angular/core';
import { LoginServiceApp } from '../../Login/shared/login.serviceApp';

@Component({
  selector: 'admindashboard',
  templateUrl: 'admin.dashboard.component.html'
})

export class AdminDashboardComponent implements OnInit {
  constructor(private loginService: LoginServiceApp ) {
  }

  ngOnInit() {  
    this.loginService.getUser().subscribe(t => {     
      console.log(t);
    });
  }
}
