import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {}

  

  postContest(data: any){
    let headers = new HttpHeaders()
    .set("Access-Control-Allow-Origin", "*");
    return this.http.post<any>("https://localhost:7078/api/contest", data, {headers});
  }
  postProblems(id:number, data: any){
    console.log(data);
    let headers = new HttpHeaders()
    .set("Access-Control-Allow-Origin", "*")
    .set('Content-Type', 'multipart/form-data');

    return this.http.post<any>(`https://localhost:7078/api/Problem/Problems?contestId=${id}`, data, {headers});
  }

  getContest(){
    return this.http.get<any>("http://localhost:3000/contestList");
  }
  getProblems(){
    return this.http.get<any>("http://localhost:3000/problemList");
  }
}
