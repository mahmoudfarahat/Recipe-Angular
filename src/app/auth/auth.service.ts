import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
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
private tokenExpirartionTimer: any;
  user = new BehaviorSubject<User>(null)

  constructor(private http:HttpClient , private router:Router) { }

  logout(){
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if(this.tokenExpirartionTimer){
      clearTimeout(this.tokenExpirartionTimer)
    }
    this.tokenExpirartionTimer = null
  }

autologout(expirartionDuration : number){
// console.log(expirartionDuration)
this.tokenExpirartionTimer = setTimeout(() => {
  alert("testing");
this.logout()
}, expirartionDuration);
}


  signup(email:string,password:string)
  {
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey,
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
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
    {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handleError), tap(resData => {
      this.router.navigate(['/recipes'])
      console.log(resData.expiresIn);
      this.handleAuth(resData.email,resData.localId,resData.idToken, +resData.expiresIn)
     }))


  }

  private handleAuth(email, userId,token,expiresIn)
  {
    const expirationDate = new Date( new Date().getTime()+ (expiresIn *1000))
    console.log(expirationDate);
    const user  =new User(email,userId,token,expirationDate);
    this.user.next(user)
    // console.log(expiresIn*1000);
    this.autologout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
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

autoLogin()
{
  const userData: { email: string, id:string,  _token:string, _tokenExpirationData:string }

= JSON.parse(localStorage.getItem('userData'))



  if(!userData)
  {
    return
  }

const loadedUser =new User(
  userData.email,userData.id, userData._token,new Date(userData._tokenExpirationData))

if(loadedUser.token){

  this.user.next(loadedUser)

  const expirationDuration =  new Date(userData._tokenExpirationData).getTime()-  new Date().getTime()

  // console.log(expirationDuration)
  this.autologout(expirationDuration)
}

}

}
