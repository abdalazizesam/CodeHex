import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {}

  

  postContest(data: any){
    const headers = new HttpHeaders()
    .set('Set-Cookie', '.AspNet.GProgectCookies=_X-UuNBajPGKbUxjBQN4GHghXkRaCtfNbAJFky1aKKaf0qR8Jgm34AaSti4z5dTuv2NaZMy0zCmfANPTXX6b_xSI1Sar2xY_lGNbOa-hbGGodq2czb1f2IZEncw9VrQB84g62ddYRK80-15u4cf3aiqaCtW9MvHZx4m93qKp054AkVPLY6X_2XX42anK59imUxkJBhuidCnIH9QdkwoihtgLiyamL9RuGH69w4ncV1zesOF1LN-axP8mU_gA9s5WeqwqBgLFLFQ7ZHUYgYhJKqMD_OWt-fIFa8NGN62ITyefkkQhEsXWSpamXbrhitwP; path=/; secure; HttpOnly')
    .set('Content-Type', 'application/json')
    .set("Bypass-Tunnel-Reminder", "Fuck you abudllah Hanafi");

    return this.http.post<any>("https://violet-showers-speak-45-241-237-190.loca.lt/api/contest", data, {headers});
  }
  postProblems(data: any){
    let headers = new HttpHeaders({
      "Bypass-Tunnel-Reminder":"fuck abdullah hanfi"
    });

    let options = {headers: headers};
    return this.http.post<any>("http://localhost:3000/problemList", data, options);
  }

  getContest(){
    return this.http.get<any>("http://localhost:3000/contestList");
  }
  getProblems(){
    return this.http.get<any>("http://localhost:3000/problemList");
  }
}
