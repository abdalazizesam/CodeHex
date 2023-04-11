import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  score: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'emad_mahfoz', score: 1305},
  {position: 2, name: 'dughamy', score: 1280},
  {position: 3, name: 'ali_mohamed', score: 1255},
  {position: 4, name: 'abdalazizesam07', score: 1235},
  {position: 5, name: 'mazeenmohamed', score: 1210},
  {position: 6, name: 'abdalahh', score: 1205},
  {position: 7, name: 'salahtarek', score: 1065},
  {position: 8, name: 'maghraby', score: 1030},
  {position: 9, name: '3bdlawi', score: 970},
  {position: 10, name: 'moazesam', score: 945},
];

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent {
  displayedColumns: string[] = ['position', 'name', 'score'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}



