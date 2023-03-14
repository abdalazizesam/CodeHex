import { Component, ElementRef, ViewChild, OnInit, Inject } from '@angular/core';
import { ContestService } from '../contest.service';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl, FormArray } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-contest-page',
  templateUrl: './contest-page.component.html',
  styleUrls: ['./contest-page.component.css']
})
export class ContestPageComponent {

  constructor(private formBuilder: FormBuilder,
    private api : ApiService){}

}
