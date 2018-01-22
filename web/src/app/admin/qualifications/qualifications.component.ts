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
  isCreate: boolean = false;
  isUpdate: boolean = false;
  msg: any = "";
  errorMsg:string = "";

  constructor(private QualificationsServiceApp: QualificationsServiceApp) {
  }
  ngOnInit() {
    this.listQualification();
  }

  onSubmit(qualificationsform) {
    if (qualificationsform.valid) {
      if (this.qualificationsModel['qualificationId'] === undefined) {
        this.QualificationsServiceApp.addQualification(this.qualificationsModel).subscribe(
          (data) => {
            if(data.status === 0){
              this.errorMsg = data.message;
            }else{
              this.errorMsg="";
            }
            this.msg = "Created successfully";
            this.listQualification();
          }
        );
        } else {
        this.QualificationsServiceApp.updateQualification(this.qualificationsModel).subscribe(
          (data) => {
            this.listQualification();
            this.msg = " Updated successfully";
          }
        );
      }
    }
  }
  listQualification() {
    this.QualificationsServiceApp.listQualification()
      .subscribe((data) => {
        if (data) {
          this.qualifications = data.body;
        }
      })
  }
  deleteQualifications(i) {
     alert('Are you sure you want to delete this skill?');
    this.qualifications.splice(i, 1);
    this.QualificationsServiceApp.deleteQualification()
      .subscribe((data) => {
        if (data) {
        }
        this.msg = "deleted successfully";
      })
  }
  editQualifications(qualifications) {
    debugger;
    this.qualificationsModel.qualificationId = qualifications.qualificationId;
    this.qualificationsModel.name = qualifications.name;
    this.qualificationsModel.description = qualifications.description;
    this.isUpdate = true;
    this.isCreate = false;
    document.getElementById('isCreate').style.display = 'none';
   // document.getElementById('btnUpdate').style.display = 'inline';
  }
  clickMe() {
    this.msg = "";
  }
}
