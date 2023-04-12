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
  contestName: string;
  startDate: Date;
  endDate: Date;
}

interface Problems{
  ProblemName: string;
  ProblemDescription: string;
  MemoryLimit: number;
  ExecutionTime: number;
}

interface ContestWithProblems{
  contestName: string;
  startDate: Date;
  endDate: Date;
  Problems: Array<Problems>;

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
  data: any; 

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
  const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const filestring = reader.result;
        console.log(filestring);
    };
}

addProblems(){
  let formData = new FormData();

    let _problem = new FormGroup({
      problemName: new FormControl(''),
      timeLimit: new FormControl(''),
      memoryLimit: new FormControl(''),
      ProblemDescription: new FormControl('')
    });

    this.problems.push(_problem);
  }



  removeProblems(){

  }


  createContest(form: NgForm){  

    let Contest: Contest = 
    {
      contestName: form.value.contestName,
      startDate: form.value.startTime,
      endDate: form.value.endTime,
    }

    this.api.postContest(Contest).subscribe({
      next:(data)=>{
        this.contestCreated = true;
        this.data = data;
        console.log(this.data);
        alert("Contest Created")
        this.problems.reset();
      },
      error:()=>{
        alert("error while creating contest")
      }
    })
  }

  finishContest(){
    let problems: Problems = this.problems.value;
    console.log(problems);
    this.api.postProblems(this.data['id'], problems).subscribe({
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

 

  OnSubmit(){

  }
}
