import { Component, OnInit } from '@angular/core';
import { SkillsService } from './shared/skills.service';
import { SkillViewModel } from '../../services/swagger-generated/models';

@Component({
  selector: 'skills',
  templateUrl: 'skills.component.html'
})

export class SkillsComponent implements OnInit {

  skillsModel: SkillViewModel = {} as SkillViewModel;


  //  skillsList  : SkillViewModel [] = [] ;
  //  add(skillsList : SkillViewModel ) {
  //    this.skillsList .push(skillsList )
  //  }

  //  onSubmit(skillsform){

  //   if (skillsform.valid) {
  //      this.skillsService.skills(skillsViewModel)
  //   }

  //  }



  //  getSkills():Observable<Skills[]> {
  //    this.skillsService.add('SkillsService: fetched skills');
  //   return of(SkillsModel);
  // }


  constructor(private skillsService: SkillsService) {
  }

  skills = [];
  ngOnInit() {
  }

  model: any = {};
  model2: any = {};
  msg: any = "";


  addSkill() {
    this.skillsService.addSkill(this.skillsModel)
      .subscribe((res) => {
        if (res) {
          console.log(res)

        }
      })
  }



  addSkills(): void {
    this.skills.push(this.model);
    this.model = {};
    this.msg = " added successfully";
  }

  deleteSkills(i) {
    this.skills.splice(i, 1);
    this.msg = " deleted successfully";
  }


  myValue;
  editSkills(i) {
    this.model.skills = this.skills[i].skills;
    this.model.description = this.skills[i].description;
    this.myValue = i;
    this.msg = " update successfully";
  }
  clickMe() {
    this.msg = "";

  }
}

