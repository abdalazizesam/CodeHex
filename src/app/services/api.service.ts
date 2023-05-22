import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {}

  public linkdata: string = 'https://57vvl80z-7132.uks1.devtunnels.ms/';

  

  postContest(data: any){
    let headers = new HttpHeaders()
    .set("Bypass-Tunnel-Reminder", "*");
    return this.http.post<any>(`${this.linkdata}contest/`, data, {headers});
  }

  deleteContest(id: any){
    return this.http.delete<any>(`${this.linkdata}contest/${id}`);
  }

  editContest(data: any){
    return this.http.put<any>(`${this.linkdata}contest/${data.id}`, data);
  }
  postProblems(id:number, data: any){
    console.log(data);
    let headers = new HttpHeaders()
    .set("Access-Control-Allow-Origin", "*")
    .set('Content-Type', 'multipart/form-data');

    return this.http.post<any>(`${this.linkdata}contest/${id}/problems`, data, {headers});
  }

  getContest(){
    let headers = new HttpHeaders()
    .set("ngrok-skip-browser-warning", "true");
    return this.http.get<any>(`${this.linkdata}contests`,{headers});
  }
  
  getProblems(){
    return this.http.get<any>("http://localhost:3000/problemList");
  }
}
