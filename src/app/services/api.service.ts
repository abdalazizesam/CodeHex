import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }


  postContest(data: any){
    return this.http.post<any>("http://localhost:3000/contestList", data);
  }
  postProblems(data: any){
    return this.http.post<any>("http://localhost:3000/problemList", data);
  }

  getContest(){
    return this.http.get<any>("http://localhost:3000/contestList");
  }
  getProblems(){
    return this.http.get<any>("http://localhost:3000/problemList");
  }
}
