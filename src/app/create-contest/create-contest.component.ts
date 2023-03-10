import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ContestService } from '../contest.service';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';

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
  contestForm = new FormGroup({
    
  })
  
  
  difficulty: Difficulty[] = [
    {value: 'easy-1', viewValue: 'Easy'},
    {value: 'medium-2', viewValue: 'Medium'},
    {value: 'hard-3', viewValue: 'Hard'},
  ];
  OnInit(): void{

}

  noProblems: number = 1;

  addProblems(){
    this.noProblems=this.noProblems+1;
    console.log(this.noProblems);
  }
  removeProblems(){
    this.noProblems=this.noProblems-1;
  }

  createContest(form: NgForm){
    const contestName = form.value.contestName;

    form.value.problemName.forEach(function (x: any) {
      console.log(x);
    });
    
    const problemDiff = form.value.problemDiff;

    console.log(contestName);
    console.log(problemDiff);

    
  }

  OnSubmit(){

  }
}
