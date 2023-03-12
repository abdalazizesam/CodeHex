import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { CreateContestComponent } from '../create-contest/create-contest.component';
import { MatDialog } from '@angular/material/dialog'
import { ContestService } from '../contest.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-problemset',
  templateUrl: './admin-problemset.component.html',
  styleUrls: ['./admin-problemset.component.css']
})
export class AdminProblemsetComponent implements OnInit {

  displayedColumns: string[] = ['ContestName','StartDate', 'EndDate', 'functions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matDialog: MatDialog, private api: ApiService){}
  ngOnInit(): void {
    this.getAllContests();
  }
  openDialog() {
    this.matDialog.open(CreateContestComponent,{ 
      width: '600px',
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
