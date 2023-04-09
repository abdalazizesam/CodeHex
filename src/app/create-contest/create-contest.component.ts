import { Component, ElementRef, ViewChild, OnInit, Inject} from '@angular/core';
import { ContestService } from '../contest.service';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl, FormArray } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogRef } from '@angular/cdk/dialog';
import { AuthService } from '../auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



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
    private authService: AuthService,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<any> ){}

    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  contestCreated: boolean = false;

  problems: any = new FormArray([]);
  

  OnInit(): void{
    console.log(this.editData)
}
ngOnInit(): void {
  this.authService.autoLogin();
  this.getAllContests();
}


getAllContests(){
  this.api.getContest().subscribe({
    next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error:(err)=>{
      alert("Error while fetching the records!!")

    }
  })
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
      timeLimit: new FormControl(''),
      memoryLimit: new FormControl(''),
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
