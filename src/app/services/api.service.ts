import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {}

  public linkdata: string = 'https://17dgstk2-7132.uks1.devtunnels.ms/';

  

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

    return this.http.post<any>(`${this.linkdata}contest/${id}/problem`, data);
  }

  getContest(){
    let headers = new HttpHeaders()
    .set("ngrok-skip-browser-warning", "true");
    return this.http.get<any>(`${this.linkdata}contests`,{headers});
  }
  
  getProblems(){
    return this.http.get<any>(`${this.linkdata}contest/problems`);
  }

  getProblemsC( id:number){
    return this.http.get<any>(`${this.linkdata}contest/${id}/problems`);
  }
  getContestD(id:number){
    let headers = new HttpHeaders()
    .set("ngrok-skip-browser-warning", "true");
    return this.http.get<any>(`${this.linkdata}contest/${id}`,{headers});
  }

  getProblemFile(id:number){
    let headers = new HttpHeaders()
    .set("ngrok-skip-browser-warning", "true");
    return this.http.get<any>(`${this.linkdata}problem/${id}`,{headers});
  }
}
