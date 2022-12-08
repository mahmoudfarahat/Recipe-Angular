import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowEditComponent } from './show-edit/show-edit.component';



@NgModule({
  declarations: [
    ShowListComponent,
    ShowEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShowsModule { }
