import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients : Ingredient[] = [
    new Ingredient('apples',5),
    new Ingredient('Tomamtoes', 10)
  ]
  constructor() { }

  ngOnInit(): void {
  }
  
  addIngredient(newIngredient:any)
  {
    console.log(newIngredient)

    this.ingredients.push(newIngredient);
  }
}
