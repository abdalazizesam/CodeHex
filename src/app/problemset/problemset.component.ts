import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-problemset',
  templateUrl: './problemset.component.html',
  styleUrls: ['./problemset.component.css']
})
export class ProblemsetComponent implements OnInit {
  constructor(private api: ApiService){}
  displayedColumns: string[] = ['problemName','problemDiff', 'problemLimits', 'problemStatement'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    console.log(this.getAllProblems())
    this.getAllProblems();
  }


  getAllProblems(){
    this.api.getProblems().subscribe({
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
