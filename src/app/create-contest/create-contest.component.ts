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
  ContestName: string;
  StartDate: Date;
  EndDate: Date;
  Problems: [];
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

    let Contest: Contest = 
    {
      ContestName: form.value.contestName,
      StartDate: form.value.startTime,
      EndDate: form.value.endTime,
      Problems: this.problems.value
    }

    this.api.postContest(Contest).subscribe({
      next:()=>{
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
