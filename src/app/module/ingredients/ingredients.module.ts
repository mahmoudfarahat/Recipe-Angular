import { ShoppingRoutingModule } from './ingredients-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from '../shared/shared.module';
import { ShoppingEditComponent } from './ingredient-edit/shopping-edit.component';





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
