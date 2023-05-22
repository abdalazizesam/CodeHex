import { Component, ElementRef, ViewChild, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



interface Contest{
  name: string;
  start_at: Date;
  end_in: Date;
  id:string;
}

interface Problems{
  ProblemName: string;
  ProblemDescription: File;
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
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent {

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
  files: Array<File> = new Array<File>;
  formdata: Array<FormData> = new Array<FormData>;
  
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
  this.files.push(file);
  
}

addProblems(){
    let _problem = new FormGroup({
      ProblemName: new FormControl(''),
      ExecutionTime: new FormControl(''),
      MemoryLimit: new FormControl(''),
      ProblemDescription: new FormControl('')
    });

    this.problems.push(_problem);
    
  }



  removeProblems(){

  }


  editContest(form: NgForm, editData: any){  

    let Contest: Contest = 
    {
      name: form.value.name,
      start_at: form.value.start_at,
      end_in: form.value.end_in,
      id: editData.id
    }

    this.api.editContest(Contest).subscribe({
      next:(data)=>{
        this.data = data;
        console.log(this.data);
        alert("Changes Saved!");
        location.reload();
      },
      error:()=>{
        alert("error while creating contest")
      }
    })
  }

  finishContest(){
    /*
      ProblemName: string;
      ProblemDescription: File;
      MemoryLimit: number;
      ExecutionTime: number;
    */

    for(let i = 0; i < this.problems.value.length; ++i){
      let temp = new FormData(); 
      temp.append("ProblemName", this.problems.value[i]["ProblemName"]);
      temp.append("ProblemDescription", this.files[i]);
      temp.append("MemoryLimit", this.problems.value[i]["MemoryLimit"]);
      temp.append("ExecutionTime", this.problems.value[i]["ExecutionTime"]);

      this.formdata.push(temp);
    }

    this.api.postProblems(this.data['id'], this.formdata).subscribe({
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
