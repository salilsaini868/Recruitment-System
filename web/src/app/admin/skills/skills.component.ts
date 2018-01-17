import { Component, OnInit } from '@angular/core';
import { SkillsService } from './shared/skills.serviceApp';
import { SkillViewModel } from '../../webapi/models/skill-view-model';

@Component({
  selector: 'skills',
  templateUrl: 'skills.component.html',
  styleUrls: ['./skills.component.css']
})

export class SkillsComponent implements OnInit {

  skillsModel: SkillViewModel = {} as SkillViewModel;
  skills: SkillViewModel[] = [];
  skillsList: SkillViewModel[];

  isCreate: boolean = false;
  isUpdate: boolean = false;
  isUserExists: boolean = false;

  addskills(skillsList: SkillViewModel) {
    this.skillsList.push(skillsList)
  }
  constructor(private SkillsServiceApp: SkillsService) {
  }
  ngOnInit() {
    this.listSkill();
  }
  model: any = {};
  msg: any = "";

  onSubmit(skillsform) {
    if (skillsform.valid) {
      if (this.skillsModel['skillId'] === undefined) {
        this.SkillsServiceApp.addSkill(this.skillsModel).subscribe(
          (data) => {
            console.log(data.body);
            this.skills.push(data.body);
            console.log("skills", this.skills)
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
      console.log(name, this.skillsModel.name);
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
        $this.isUserExists = true;
        return;
      }
    });
  }
  listSkill() {
    this.SkillsServiceApp.listSkill()
      .subscribe((data) => {
        if (data) {
          this.skills = data.body;
          console.log(this.skills)
        }
      })
  }
  deleteSkills(i) {
    this.skills.splice(i, 1);
    this.SkillsServiceApp.deleteSkill()
      .subscribe((data) => {
        if (data) {
          console.log(data)
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

