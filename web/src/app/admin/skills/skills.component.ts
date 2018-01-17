import { Component, OnInit } from '@angular/core';
import { SkillsServiceApp} from './shared/skills.serviceApp';
import { SkillViewModel } from '../../webapi/models/skill-view-model';

@Component({
  selector: 'app-skills',
  templateUrl: 'skills.component.html'
})

export class SkillsComponent implements OnInit {

  skillsModel: SkillViewModel = {} as SkillViewModel;
  skills: SkillViewModel[] = [];
  skillsList: SkillViewModel[];

  isCreate: boolean = false;
  isUpdate: boolean = false;
  isSkillExists: boolean = false;

  addskills(skillsList: SkillViewModel) {
  }
  constructor(private SkillsServiceApp: SkillsServiceApp) {
  }
  ngOnInit() {
    this.listSkill();
  }
  msg: any = "";

  onSubmit(skillsform) {
    if (skillsform.valid) {
      if (this.skillsModel['skillId'] === undefined) {
        this.SkillsServiceApp.addSkill(this.skillsModel).subscribe(
          (data) => {
            this.skills.push(data.body);
            this.msg = " created successfully";
          }
        );
        this.skillsModel.name = "";
        this.skillsModel.description = "";
      } else {
        this.SkillsServiceApp.updateSkill(this.skillsModel).subscribe(
          (data) => {
            this.listSkill();
            this.msg = " updated successfully";
          }
        );
      }
      if (name == this.skillsModel.name) {
      }
      document.getElementById('updatePanel').style.display = 'block';
      document.getElementById('btnUpdate').style.display = 'inline';
      this.skillsModel.name = "";
      this.skillsModel.description = "";
    }
    this.isCreate = true;
  }
  checkNameExitsOnBlur() {
    let $this = this;
    let skillName = $this.skillsModel.name;
    this.skills.forEach(function (skill) {
      if (skill['name'] === skillName) {
        $this.isSkillExists = true;
        return;
      }
    });
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
    document.getElementById('btnSave').style.display = 'none';
  }
  clickMe() {
    this.msg = "";
  }
}

