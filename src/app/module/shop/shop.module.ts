import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopEditComponent } from './shop-edit/shop-edit.component';
import { ShopListComponent } from './shop-list/shop-list.component';



@NgModule({
  declarations: [
    ShopEditComponent,
    ShopListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShopModule { }
