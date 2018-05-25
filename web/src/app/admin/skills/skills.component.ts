import { Component, OnInit } from '@angular/core';
import { SkillsServiceApp } from './shared/skills.serviceApp';
import { SkillViewModel } from '../../webapi/models/skill-view-model';
import { DisplayMessageService } from '../../shared/toastr/display.message.service';
import { isNullOrUndefined } from 'util';
import { Status } from '../../app.enum';

@Component({
  selector: 'app-skills',
  templateUrl: 'skills.component.html',
  styleUrls: ['shared/skills.scss']
})

export class SkillsComponent implements OnInit {

  skillsModel: SkillViewModel = {} as SkillViewModel;
  skills: SkillViewModel[] = [] as SkillViewModel[];
  submitted = false;
  isSkillExists: boolean = false;

  constructor(private skillsServiceApp: SkillsServiceApp, private displayMessage: DisplayMessageService) {
  }
  ngOnInit() {
    this.listSkill();
  }
  onSubmit(skillsform) {
    this.submitted = true;
    if (skillsform.valid) {
      if (this.skillsModel['skillId'] === undefined) {
        this.skillsServiceApp.addSkill(this.skillsModel).subscribe(
          (data) => {
            if (data.status === 0) {
            } else {
            }
            this.listSkill();
          }
        );
      } else {
        this.skillsServiceApp.updateSkill(this.skillsModel).subscribe(
          (data) => {
            this.listSkill();
          }
        );
      }
    }
  }
  checkNameExitsOnBlur() {
    let $this = this;
    let skillName = $this.skillsModel.name;
    this.skills.every(function (skill) {
      if (skill['name'] === skillName) {
        $this.isSkillExists = true;
        return false;
      } else {
        $this.isSkillExists = false;
        return true;
      }
    });
  }
  listSkill() {
    this.skillsServiceApp.listSkill().subscribe((data) => {
      if (data) {
        this.skills = data.body;
      }
    });
  }
  deleteSkills(skill, i) {
    let isDelete = confirm("Are you sure you want to delete skill?");
    if (isDelete) {
      this.skills.splice(i, 1);
      this.skillsServiceApp.deleteSkill(skill).subscribe(
        (data) => {
          if (data.status === Status.Success) {
            this.skillsModel = data.body;
            this.displayMessage.showSuccess('SKILLS.DELETEDSUCCESSFULLY');
          }
          if (data.status === Status.Fail) {
            this.displayMessage.showWarning('SKILLS.FAILEDTODELETE');
          }
          if (data.status === Status.Error) {
            this.displayMessage.showError('SKILLS.DELETEERROR');
          }
        },
        (error) => {
          this.displayMessage.showError('SKILLS.DELETEERROR');
       });
    }
  }
  getSkillById(skillId) {
    if (!isNullOrUndefined(skillId)) {
      this.skillsServiceApp.getSkillById(skillId).subscribe(
        (data) => {
          if (data.status === Status.Success) {
            this.skillsModel = data.body;
          }
        });
    }
  }
  editSkills(skillId) {
    this.skillsModel.skillId = skillId;
    this.getSkillById(skillId);
  }
}