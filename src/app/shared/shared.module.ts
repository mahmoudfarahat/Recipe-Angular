import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgModule } from "@angular/core";

import { DropdownDirective } from '../dropdown.directive';
import { AlertComponent } from './alert/alert.component';


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
  CommonModule
]
})

export class SharedModule{}
