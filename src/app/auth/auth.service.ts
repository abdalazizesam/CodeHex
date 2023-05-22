import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError ,tap } from 'rxjs/operators';
import { throwError, Subject, Observable } from 'rxjs';
import { User } from "./user.model";
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../services/api.service';




// export interface AuthResponseData {
//     kind: string;
//     idToken: string;
//     email: string;
//     refreshToken: string;
//     expiresIn: string;
//     localId: string;
//     registered?: boolean;
// };


export interface Response {
    email: string;
    password: string;
};

@Injectable ({providedIn: 'root'})
export class AuthService {

    user = new Subject<User>();

    linkdata = this.api.linkdata;



    constructor(private http: HttpClient, private cookie: CookieService, private api: ApiService){

    }
    signup(email: string, password: string){
        return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkSXbHRcg7IpMiIeAHb_WGE58EdhPwkBY',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError),tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken,+resData.expiresIn)));
    }
    login(email: string, password: string): Observable<any>{
        console.log(email);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const data = { email, password };

        // return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkSXbHRcg7IpMiIeAHb_WGE58EdhPwkBY',
        // {
        //     email: email,
        //     password: password,
        //     returnSecureToken: true
        // }).pipe(catchError(this.handleError),tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken,+resData.expiresIn)));
        return this.http.post(`${this.linkdata}login`,data, { headers });
    }
    private handleAuthentication(email: string,userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + +expiresIn*1000);
            const user = new User(email, userId , token , expirationDate);
            this.user.next(user);
            localStorage.setItem('userData',JSON.stringify(user))
    }

    autoLogin(){
        const userData: {
            emil: string;
            id: string;
            _token: string;
            _tokenExpirationDate:string;
        } = JSON.parse(localStorage.getItem('userData')!);
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.emil,userData.id,userData._token,new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser); 
        }
    }

    logout(){
        this.user.next(null!);
        localStorage.clear();
    }





    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unkown error occurred!';
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage="This email already exists.";
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage= "Operation not allowed!";
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMessage= "Too Many Attemps Try Later.";
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = "This email does not exist.";
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = "Password is not correct.";
                    break;
                case 'USER_DISABLED' :
                    errorMessage = "This User is disabled.";
                    break;
            }
            return throwError(errorMessage);
    }
}