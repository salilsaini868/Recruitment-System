import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'skills',
  templateUrl: 'skills.component.html'
})

export class SkillsComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {

  }
  Skills = [];
  model:any={};
  msg:any="";
  
  addSkills(){
 this.Skills.push(this.model);
 this.model = {};
 this.model = {};

 this.msg=" success";
  }
 
  deleteSkills(i){
 this.Skills.splice(i,1);
 this.msg=" success";
  }


//  myValue;
//   editSkills(i){
//  this.model.name= this.skills[i].name;
//  this.model.description = this.skills[i].description;
//  this.msg=" success";
//   }
}
