import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";




@NgModule({
  declarations:[
    AuthComponent,
  ],
imports:[
  ReactiveFormsModule,
  SharedModule,
  RouterModule.forChild([ { path:'auth',component:AuthComponent}])
]
})


export class AuthModule{};
