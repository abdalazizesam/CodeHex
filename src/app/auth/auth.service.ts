import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError ,tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
};

@Injectable ({providedIn: 'root'})
export class AuthService {

    user = new Subject<User>();


    constructor(private http: HttpClient){

    }
    signup(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkSXbHRcg7IpMiIeAHb_WGE58EdhPwkBY',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError),tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken,+resData.expiresIn)));
    }
    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkSXbHRcg7IpMiIeAHb_WGE58EdhPwkBY',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken,+resData.expiresIn)));
    }
    private handleAuthentication(email: string,userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + +expiresIn*1000);
            const user = new User(email, userId , token , expirationDate);
            this.user.next(user);
    }

    logout(){
        this.user.next(null!);
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