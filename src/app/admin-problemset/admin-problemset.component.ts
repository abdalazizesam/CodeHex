import { Component } from '@angular/core';
import { CreateContestComponent } from '../create-contest/create-contest.component';
import { MatDialog } from '@angular/material/dialog'
import { ContestService } from '../contest.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-problemset',
  templateUrl: './admin-problemset.component.html',
  styleUrls: ['./admin-problemset.component.css']
})
export class AdminProblemsetComponent {
  constructor(private matDialog: MatDialog){}
  openDialog() {
    this.matDialog.open(CreateContestComponent,{ 
      width: '600px',
    })
  }

}
