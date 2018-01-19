import { Component, OnInit } from '@angular/core';
import { SkillsServiceApp } from './shared/skills.serviceApp';
import { SkillViewModel } from '../../webapi/models/skill-view-model';

@Component({
  selector: 'app-skills',
  templateUrl: 'skills.component.html'
})

export class SkillsComponent implements OnInit {
  skillsModel: SkillViewModel = {} as SkillViewModel;
  skills: SkillViewModel[] = [] as SkillViewModel[];
  isCreate: boolean = false;
  isUpdate: boolean = false;
  msg: any = "";
  errorMsg:string = "";

  
  constructor(private SkillsServiceApp: SkillsServiceApp) {
  }
  ngOnInit() {
    this.listSkill();
  }
  onSubmit(skillsform) {
    if (skillsform.valid) {
      if (this.skillsModel['skillId'] === undefined) {
        this.SkillsServiceApp.addSkill(this.skillsModel).subscribe(
          (data) => {
            if(data.status === 0){
                this.errorMsg = data.message;
            }else{
              this.errorMsg = "";
            }
            this.listSkill();
            console.log(data.status,this.errorMsg);
            this.msg = " created successfully";
          }
        );
      } else {
        this.SkillsServiceApp.updateSkill(this.skillsModel).subscribe(
          (data) => {
            this.listSkill();
            this.msg = " updated successfully";
          }
        );
      }
    }
  }
  listSkill() {
    this.SkillsServiceApp.listSkill()
      .subscribe((data) => {
        if (data) {
          this.skills = data.body;
        }
      })
  }
  deleteSkills(i) {
    alert('Are you sure you want to delete this skill?');
    this.skills.splice(i, 1);
    this.SkillsServiceApp.deleteSkill()
      .subscribe((data) => {
        if (data) {
        }
        this.msg = "deleted successfully";
      })
  }
  editSkills(skills) {
    this.skillsModel.skillId = skills.skillId;
    this.skillsModel.name = skills.name;
    this.skillsModel.description = skills.description;
    this.isUpdate = true;
    this.isCreate = false;
    document.getElementById('isCreate').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'inline';
  }
  clickMe() {
    this.msg = "";
  }
}

