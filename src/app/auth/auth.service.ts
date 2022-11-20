import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AuthResponseData{
  kind:string,
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string
  registered?:boolean
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new BehaviorSubject<User>(null)

  constructor(private http:HttpClient) { }

  logout(){
    this.user.next(null)
  }




  signup(email:string,password:string)
  {
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpfMNtL8U0tMDs0e74dCCuav1imtpjbTU',
   {
    email:email,
    password:password,
    returnSecureToken:true
   }).pipe(catchError(this.handleError), tap(resData => {
    this.handleAuth(resData.email,resData.localId,resData.idToken, +resData.expiresIn)
   }))
  }

  login(email:string,password:string)
  {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpfMNtL8U0tMDs0e74dCCuav1imtpjbTU',
    {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuth(resData.email,resData.localId,resData.idToken, +resData.expiresIn)
     }))
  }

  private handleAuth(email, userId,token,expiresIn)
  {
    const expirationDate = new Date( new Date().getTime()+ expiresIn *1000)
    const user  =new User(email,userId,token,expirationDate);
    this.user.next(user)
  }

  private handleError(errorRes : HttpErrorResponse){
    let errorMessage = 'Unknown error occured'
    if(!errorRes.error || !errorRes.error.error)
    {
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message)
    {
      case 'EMAIL_EXISTS':
       errorMessage = "This Email Exits Already"
      case 'EMAIL_NOT_FOUND':
       errorMessage = "This Email is Not Found"
      case 'INVALID_PASSWORD':
       errorMessage = "This Password is Invalid"

    }
  return throwError(errorMessage);
  }
}
