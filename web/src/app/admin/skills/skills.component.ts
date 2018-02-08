import { Component, OnInit } from '@angular/core';
import { SkillsServiceApp } from './shared/skills.serviceApp';
import { SkillViewModel } from '../../webapi/models/skill-view-model';

@Component({
  selector: 'app-skills',
  templateUrl: 'skills.component.html',
  styleUrls: ['shared/skills.scss']
})

export class SkillsComponent implements OnInit {

  skillsModel: SkillViewModel = {} as SkillViewModel;
  skills: SkillViewModel[] = [] as SkillViewModel[];
  isCreateOrUpdate: boolean = true;

  constructor(private skillsServiceApp: SkillsServiceApp) {
  }
  ngOnInit() {
    this.listSkill();
  }
  onSubmit(skillsform) {
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
  listSkill() {
    this.skillsServiceApp.listSkill()
      .subscribe((data) => {
        if (data) {
          this.skills = data.body;
        }
      });
  }
  deleteSkills(i) {
    this.skills.splice(i, 1);
    this.skillsServiceApp.deleteSkill().subscribe((data) => {
      if (data) {
      }
    });
  }
  editSkills(skills) {
    this.skillsModel.skillId = skills.skillId;
    this.skillsModel.name = skills.name;
    this.skillsModel.description = skills.description;
    this.isCreateOrUpdate = false;
  }
}
