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

interface Problems{
  problemName: string;
  probelmFile: string;
  memory_Limit: number;
  time_Limit: number;
}

interface ContestWithProblems{
  contestName: string;
  startDate: Date;
  endDate: Date;
  Problems: Array<Problems>;

}

@Component({
  selector: 'app-add-problems',
  templateUrl: './add-problems.component.html',
  styleUrls: ['./add-problems.component.css']
})
export class AddProblemsComponent {

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<any> ){}

    problems: any = new FormArray([]);
    data: any; 
    files: Array<File> = new Array<File>;
    formdata: Array<FormData> = new Array<FormData>;
    

    getfile(event: any){ 
      const file = event.target.files[0];
      this.files.push(file);
      console.log(this.files);
    }


    addProblems(){
      let _problem = new FormGroup({
        problemName: new FormControl(''),
        time_Limit: new FormControl(''),
        memory_Limit: new FormControl(''),
        probelmFile: new FormControl('')
      });
  
      this.problems.push(_problem);
    }
  
    removeProblems(){

    }

    sProblems: Array<Problems> = new Array<Problems>
    result: any


    finishContest(){
      /*
        ProblemName: string;
        ProblemDescription: File;
        MemoryLimit: number;
        ExecutionTime: number;
      */
     
      for(let i = 0; i < this.problems.value.length; ++i){
      //   let temp = new FormData(); 
      //   // temp.append("ProblemName", this.problems.value[i]["ProblemName"]);
      //   temp.append("probelmFile", this.files[i]);
      //   temp.append("memory_Limit", this.problems.value[i]["memory_Limit"]);
      //   temp.append("time_Limit", this.problems.value[i]["time_Limit"]);
  
      //   this.formdata.push(temp);
      const file = this.files[i];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async(arg:any) => {
        this.result = await arg.target.result
      };
      console.log(this.result);


      // let temp:Problems = {
        
      //   probelmFile: file
      // }


     }
  
      this.api.postProblems(this.data['id'], this.formdata).subscribe({
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

}
function bota(arg0: File): string | Blob {
  throw new Error('Function not implemented.');
}

