import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CreateContestComponent } from './create-contest/create-contest.component';

export interface AuthResponseData {
  
};

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  constructor(private http: HttpClient) { }

   createContest(user: object){
       this.http.post('https://contestproject.free.beeceptor.com/', user).subscribe(
         data => {
            console.log(data);
         },
         (err: HttpErrorResponse) => {
           console.log (err.message);
         }
       );
      }

}
