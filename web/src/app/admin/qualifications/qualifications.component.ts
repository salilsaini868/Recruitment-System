import { Component, OnInit } from '@angular/core';
import { QualificationsServiceApp } from './shared/qualifications.serviceApp';
import { QualificationViewModel } from '../../webapi/models/qualification-view-model';
import { DisplayMessageService } from '../../shared/toastr/display.message.service';
import { isNullOrUndefined } from 'util';
import { Status } from '../../app.enum';

@Component({
  selector: 'app-qualifications',
  templateUrl: 'qualifications.component.html',
  styleUrls: ['qualifications.scss']
})

export class QualificationsComponent implements OnInit {
  qualificationsModel: QualificationViewModel = {} as QualificationViewModel;
  qualifications: QualificationViewModel[] = [] as QualificationViewModel[];
  submitted = false;
  isQualificationExists: boolean = false;

  constructor(private qualificationsServiceApp: QualificationsServiceApp, private displayMessage: DisplayMessageService) {
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

  deleteQualifications(qualification, i) {
    let isDelete = confirm("Are you sure you want to delete Qualification...!");
    if (isDelete) {
      this.qualifications.splice(i, 1);
      this.qualificationsServiceApp.deleteQualification(qualification).subscribe(
        (data) => {
          if (data.status === Status.Success) {
            this.qualificationsModel = data.body;
            this.displayMessage.showSuccess('QUALIFICATIONS.DELETEDSUCCESSFULLY');
          }
          if (data.status === Status.Fail) {
            this.displayMessage.showWarning('QUALIFICATIONS.FAILEDTODELETE');
          }
          if (data.status === Status.Error) {
            this.displayMessage.showError('QUALIFICATIONS.DELETEERROR');
          }
        },
        (error) => {
          this.displayMessage.showError('QUALIFICATIONS.DELETEERROR');
       });
    }
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
    this.getQualificationById(qualificationId);
  }
}


