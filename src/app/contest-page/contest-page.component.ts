import { Component, ElementRef, ViewChild, OnInit, Inject, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContestService } from '../contest.service';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'
import { ApiService } from '../services/api.service';
import { DialogRef } from '@angular/cdk/dialog';
import { AuthService } from '../auth/auth.service';
import { CreateContestComponent } from '../create-contest/create-contest.component';
import { SubmitPageComponent } from '../submit-page/submit-page.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { idText } from 'typescript';


export interface PeriodicElement {
  name: string;
  position: number;
  time_Limit: number;
  memory_Limit: string;
}



@Component({
  selector: 'app-contest-page',
  templateUrl: './contest-page.component.html',
  styleUrls: ['./contest-page.component.css']
})
export class ContestPageComponent implements OnInit {

  displayedColumns: string[] = ['no-problem', 'name', 'time-limit', 'memory-limit','functions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private zone: NgZone,
    private matDialog: MatDialog,
    private api : ApiService){}


    getProblems(id:number){
      this.api.getProblemsC(id).subscribe({
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

    getContestName(id:number){
      this.api.getContestD(id).subscribe({
        next:(res)=>{


        },
        error:(err)=>{
          alert("Error while fetching the records!!")
        }
      })
    }

    ngOnInit(): void {
      this.authService.autoLogin();
      this.route.params.subscribe(params => {
        const id = params['id'];
        this.getProblems(id)
      });
  
    }


    viewPDF(element: any){
      data: element
      console.log(element.id)
      
      this.api.getProblemFile(element.id).subscribe({
        next:(res)=>{},
        error:(res)=>{
          console.log(res)

          window.open(res.url,'_blank'); 
        }
      })
    }

    openSubmit() {
      this.zone.run(() => {
      this.matDialog.open(SubmitPageComponent,{ 
        width: '800px', height: '650px',
      })
    })
    }

    submitProblem(element: any){
      data: element
      console.log(element)
      this.openSubmit()
    }




}
