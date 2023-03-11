import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ContestService } from '../contest.service';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl, FormArray } from '@angular/forms';

interface Difficulty {
  value: string;
  viewValue: string;
}

type ContestObj= {
  name: string;
  job: number;
};

@Component({
  selector: 'app-creat-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.css']
})
export class CreateContestComponent{
  constructor(private formBuilder: FormBuilder){}

  problems: any = new FormArray([]);
  
  difficulty: Difficulty[] = [
    {value: 'easy-1', viewValue: 'Easy'},
    {value: 'medium-2', viewValue: 'Medium'},
    {value: 'hard-3', viewValue: 'Hard'},
  ];
  OnInit(): void{

}

addProblems(){

    const _problem = new FormGroup({
      problemName: new FormControl(''),
      problemDiff: new FormControl(''),
      problemLimits: new FormControl(''),
      problemStatement: new FormControl('')
    });

    this.problems.push(_problem);
  }



  removeProblems(){
    this.problems.removeAt(this.problems.length - 1)
  }

  createContest(form: NgForm){
    console.log(this.problems.value)
  }

  OnSubmit(){

  }
}
