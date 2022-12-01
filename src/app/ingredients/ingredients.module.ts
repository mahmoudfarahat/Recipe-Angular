import { ShoppingRoutingModule } from './shopping-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from '../shared/shared.module';





@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports:[
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    ShoppingRoutingModule
  ]


})


export class IngredientsModule{}
