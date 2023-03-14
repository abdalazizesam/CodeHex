import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';

export interface PeriodicElement {
  name: string;
  position: number;
  timeLimit: number;
  memoryLimit: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'A Warm Introduction', timeLimit: 1, memoryLimit: '256 megabytes'},
  {position: 2, name: 'Finding a Worthy Challenge', timeLimit: 2, memoryLimit: '256 megabytes'},
  {position: 3, name: 'Defense Skills', timeLimit: 2, memoryLimit: '256 megabytes'},
  {position: 4, name: 'Power To Conquer', timeLimit: 2, memoryLimit: '512 megabytes'},
  {position: 5, name: 'How Spells Are Made', timeLimit: 6, memoryLimit: '512 megabytes'},
  {position: 6, name: 'The Shooting Test', timeLimit: 1, memoryLimit: '256 megabytes'},
  {position: 7, name: 'Power To Conquer (pt.2)', timeLimit: 2, memoryLimit: '512 megabytes'}
];

@Component({
  selector: 'app-problemset',
  templateUrl: './problemset.component.html',
  styleUrls: ['./problemset.component.css']
})
export class ProblemsetComponent implements OnInit {
  constructor(private api: ApiService){}
  displayedColumns: string[] = ['no-problem', 'name-problem', 'time-limit', 'memory-limit','functions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

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

  viewPDF(element: any){
    data: element
    console.log(element)
    switch(element.position) {
      case 1:
        window.open("https://drive.google.com/file/d/1yg-na-9dqyWadzf0XuNJxDskaDAxk4JT/view")
        break;
      case 2:
        window.open("https://drive.google.com/file/d/13NWNmGc9ODiLUzXhRxzTsLEOyCJpQPr1/view")
        break;
      case 3:
        window.open("https://drive.google.com/file/d/17XuK09ag-ja4PYgbHIVoioGHrNfv958h/view")
        break;
      case 4:
        window.open("https://drive.google.com/file/d/1mgwf3lQsh11h1_o_f7BQ6NERt-VfRKff/view")
        break;
      case 5:
        window.open("https://drive.google.com/file/d/1UHAGJId56tFmjxXFuBAhffNzOWXIXoRF/view")
        break;
      case 6:
        window.open("https://drive.google.com/file/d/1dDRwh1akkwKSrDdN5pUragUaQWjn-YGp/view")
        break;
      case 7:
        window.open("https://drive.google.com/file/d/1jKalN5JEXLdJs6jy3UF8kwlIlrx4KoGe/view")
        break;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
