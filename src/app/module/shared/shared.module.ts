import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgModule } from "@angular/core";


import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from 'src/app/directive/dropdown.directive';


@NgModule({
  declarations:[
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports:[

    CommonModule
  ],
exports:[
  DropdownDirective,
  AlertComponent,
  LoadingSpinnerComponent,
  CommonModule,

]
})

export class SharedModule{}
