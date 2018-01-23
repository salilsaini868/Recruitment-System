import { Component, OnInit} from '@angular/core';
import { QualificationsServiceApp } from './shared/qualifications.serviceApp';
import { QualificationViewModel } from '../../webapi/models/qualification-view-model';

@Component({
  selector: 'qualifications',
  templateUrl: 'qualifications.component.html'
})

export class QualificationsComponent implements OnInit {
 qualificationsModel: QualificationViewModel = {} as QualificationViewModel;
  qualifications: QualificationViewModel[] = [] as QualificationViewModel[];
  isCreateOrUpdate: boolean = true;

  constructor(private qualificationsServiceApp: QualificationsServiceApp) {
  }
  ngOnInit() {
    this.listQualification();
  }

  onSubmit(qualificationsform) {
    if (qualificationsform.valid) {
      if (this.qualificationsModel['qualificationId'] === undefined) {
        this.qualificationsServiceApp.addQualification(this.qualificationsModel).subscribe(
          (data) => {
            if(data.status === 0){
            }else{
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
  listQualification() {
    this.qualificationsServiceApp.listQualification()
      .subscribe((data) => {
        if (data) {
          this.qualifications = data.body;
        }
      })
  }
  deleteQualifications(i) {
    this.qualifications.splice(i, 1);
    this.qualificationsServiceApp.deleteQualification()
      .subscribe((data) => {
        if (data) {
        }
      })
  }
  editQualifications(qualifications) {
    this.qualificationsModel.qualificationId = qualifications.qualificationId;
    this.isCreateOrUpdate = false;
  }
}
