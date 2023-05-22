import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-my-submition',
  templateUrl: './my-submition.component.html',
  styleUrls: ['./my-submition.component.css']
})
export class MySubmitionComponent {

  constructor(private api: ApiService){}
  displayedColumns: string[] = ['when', 'problemName', 'lang', 'verdict', 'timeLimit', 'memoryLimit'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  

  ngOnInit(): void {
    this.getAllProblems()
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


}
