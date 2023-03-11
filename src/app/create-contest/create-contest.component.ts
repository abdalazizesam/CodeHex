import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ContestService } from '../contest.service';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl, FormArray } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog'
import { DialogRef } from '@angular/cdk/dialog';

interface Difficulty {
  value: string;
  viewValue: string;
}

interface Contest{
  [key: string]: [];
}

@Component({
  selector: 'app-creat-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.css']
})
export class CreateContestComponent{
  constructor(private formBuilder: FormBuilder, private api : ApiService, private dialogRef: MatDialogRef<any> ){}

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
      contestName: new FormControl(''),
      problemName: new FormControl(''),
      problemDiff: new FormControl(''),
      problemLimits: new FormControl(''),
      problemStatement: new FormControl('')
    });

    this.problems.push(_problem);
  }



  removeProblems(){

  }


  createContest(form: NgForm){
    let Contest: Contest = {}
    Contest[form.value.contestName] = this.problems.value
    console.log(form.value.contestName)
    this.api.postContest(Contest).subscribe({
      next:(res)=>{
        alert("Contest Created")
        this.problems.reset();
        this.dialogRef.close();
      },
      error:()=>{
        alert("error while creating contest")
      }
    })
  }

  OnSubmit(){

  }
}
