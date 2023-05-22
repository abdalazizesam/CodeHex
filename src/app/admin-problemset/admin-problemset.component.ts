import { Component, OnInit,AfterViewInit, ViewChild, NgZone } from '@angular/core';
import { CreateContestComponent } from '../create-contest/create-contest.component';
import { MatDialog } from '@angular/material/dialog'
import { ContestService } from '../contest.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditPageComponent } from '../edit-page/edit-page.component';
import { AddProblemsComponent } from '../add-problems/add-problems.component';

interface Contest{
  name: string;
  start_at: Date;
  end_in: Date;
}

@Component({
  selector: 'app-admin-problemset',
  templateUrl: './admin-problemset.component.html',
  styleUrls: ['./admin-problemset.component.css']
})
export class AdminProblemsetComponent implements OnInit {

  displayedColumns: string[] = ['ContestName','StartDate', 'EndDate','NoProblems', 'visibility', 'functions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matDialog: MatDialog, private api: ApiService, private zone: NgZone){}

  ngOnInit(): void {
    this.getAllContests();
    console.log(this.editContest);
  }
 
  openCreate() {
    this.zone.run(() => {
    this.matDialog.open(CreateContestComponent,{ 
      width: '600px',
    })
  })
  }
public rowdata : string = '0';

getContestId(row: any){
 this.rowdata = row.id;
}
  

editContest(row: any){
  console.log(row);

   const rowdata: Contest = {
    name: row.name,
    start_at: row.start_at,
    end_in: row.end_in
   } 
  console.log(rowdata);

  this.matDialog.open(EditPageComponent,{ 
    width: '600px',
    data: row
  })
}

createProblems(row: any){

  this.matDialog.open(AddProblemsComponent,{ 
    width: '600px',
    data: row
  })
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

  deleteContest(id: any){
    this.api.deleteContest(id).subscribe( response =>{ console.log('Contest deleted successfully');
    location.reload();},
    error => console.error('Error deleting contest:', error));
    
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
