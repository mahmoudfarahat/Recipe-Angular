import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
isLoginMode = true;
error = null;
isLoading =false;

form =  new FormGroup({
  'password': new FormControl('',Validators.required),
  'email': new FormControl('',[Validators.email, Validators.required])
})
authObs:Observable<AuthResponseData>
onSwitchMode(){
  this.isLoginMode =!this.isLoginMode;
}

onSubmit(){
  if(!this.form.valid)
  {return;}

 const email = this.form.value.email
  const password = this.form.value.password
  this.isLoading= true
  if(this.isLoginMode)
  {
    this.authObs = this.authService.login(email,password)
  }
  else
  {
  this.authObs =  this.authService.signup(email,password)
  }
  this.authObs.subscribe(a => {
    console.log(a)
   this.isLoading=false
      }, errorResponse =>{
        console.log(errorResponse)
        this.error =errorResponse
        this.isLoading= false
      })
  this.form.reset()
}
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
   }
   onHandlerError()
   {
    this.error =null;
   }
}
