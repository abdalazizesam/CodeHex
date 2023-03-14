import { Component, ElementRef, ViewChild, OnInit, Inject} from '@angular/core';
import { ContestService } from '../contest.service';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl, FormArray } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogRef } from '@angular/cdk/dialog';




interface Difficulty {
  value: string;
  viewValue: string;
}

interface Contest{
  ContestName: string;
  StartDate: Date;
  EndDate: Date;
}

@Component({
  selector: 'app-creat-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.css']
})
export class CreateContestComponent{
  constructor(private formBuilder: FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<any> ){}

  contestCreated: boolean = false;

  problems: any = new FormArray([]);
  
  difficulty: Difficulty[] = [
    {value: 'easy-1', viewValue: 'Easy'},
    {value: 'medium-2', viewValue: 'Medium'},
    {value: 'hard-3', viewValue: 'Hard'},
  ];
  
  OnInit(): void{
    console.log(this.editData)
}
ngOnInit(form: NgForm): void {
  console.log(this.editData)
}




getfile(event: any){ 
  this.file = event.target.files[0];
  console.log("file", this.file)
}

addProblems(){
  let formData = new FormData();
  formData.set("file", this.file);

    let _problem = new FormGroup({
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
    }

    this.api.postContest(Contest).subscribe({
      next:()=>{
        this.contestCreated = true;
        alert("Contest Created")
        this.problems.reset();
      },
      error:()=>{
        alert("error while creating contest")
      }
    })
  }

  finishContest(){
    this.api.postProblems(this.problems.value).subscribe({
      next:()=>{
        this.contestCreated = true;
        alert("Contest Created")
        this.problems.reset();
        this.dialogRef.close();
      },
      error:()=>{
        alert("error while creating contest")
      }
    })
  }
  file:any;

 

  OnSubmit(){

  }
}
