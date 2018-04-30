import { Component, OnInit } from '@angular/core';
import { QualificationsServiceApp } from './shared/qualifications.serviceApp';
import { QualificationViewModel } from '../../webapi/models/qualification-view-model';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Status } from '../../app.enum';

@Component({
  selector: 'app-qualifications',
  templateUrl: 'qualifications.component.html'
})

export class QualificationsComponent implements OnInit {
  qualificationsModel: QualificationViewModel = {} as QualificationViewModel;
  qualifications: QualificationViewModel[] = [] as QualificationViewModel[];
  submitted = false;
  isQualificationExists: boolean = false;
  Title: any = true;

  constructor(private qualificationsServiceApp: QualificationsServiceApp, private router: Router, private route: ActivatedRoute, ) {
  }
  ngOnInit() {
    this.listQualification();
  }

  onSubmit(qualificationsform) {
    this.submitted = true;
    if (qualificationsform.valid) {
      if (this.qualificationsModel['qualificationId'] === undefined) {
        this.qualificationsServiceApp.addQualification(this.qualificationsModel).subscribe(
          (data) => {
            if (data.status === 0) {
            } else {
            }
            this.listQualification();
          }
        );
      } else {
        this.qualificationsServiceApp.updateQualification(this.qualificationsModel).subscribe(
          (data) => {
            this.listQualification();
          }
        );
      }
    }
  }
  checkQualificationExits() {
    let $this = this;
    let qualificationname = $this.qualificationsModel.name;
    this.qualifications.every(function (qualification) {
      if (qualification['name'] === qualificationname) {
        $this.isQualificationExists = true;
        return false;
      } else {
        $this.isQualificationExists = false;
        return true;
      }
    });
  }
  listQualification() {
    this.qualificationsServiceApp.getAllQualification()
      .subscribe((data) => {
        if (data) {
          this.qualifications = data.body;
        }
      });
  }

  deleteQualifications(i) {
    this.qualifications.splice(i, 1);
    this.qualificationsServiceApp.deleteQualification()
      .subscribe((data) => {
        if (data) {
        }
      });
  }
  getQualificationById(qualificationId) {
      if (!isNullOrUndefined(qualificationId)) {
        this.qualificationsServiceApp.getQualificationById(qualificationId).subscribe(
          (data) => {
            if (data.status === Status.Success) {
              this.qualificationsModel = data.body;
            }
          });
      }
  }

  editQualifications(qualificationId) {
    this.qualificationsModel.qualificationId = qualificationId;
    this.getQualificationById(qualificationId)
    this.Title = false;
  }
}


