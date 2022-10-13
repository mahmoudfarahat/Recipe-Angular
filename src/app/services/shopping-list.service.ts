import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
ingredientsChanged = new EventEmitter<Ingredient[]>();

  constructor() { }


  private ingredients : Ingredient[] = [
    new Ingredient('apples',5),
    new Ingredient('Tomamtoes', 10)
  ]


  getIngredients(){
    console.log(this.ingredients.slice())
    return this.ingredients.slice()
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient)
     

this.ingredientsChanged.emit(this.ingredients.slice())
 
    
  }

  addIngredients(ingredients: Ingredient[]){
 
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.emit(this.ingredients.slice())
}


}
