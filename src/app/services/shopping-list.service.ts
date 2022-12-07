import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './ingredients/ingredient.model';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
// ingredientsChanged = new EventEmitter<Ingredient[]>();
ingredientsChanged = new Subject<Ingredient[]>();

startedEditing = new Subject<number>();

  constructor() { }


  private ingredients : Ingredient[] = [
    new Ingredient('apples',5),
    new Ingredient('Tomamtoes', 10)
  ]

  getIndgredient(index: number){
    return this.ingredients[index]
  }

  // getIngredients(){
  //   console.log(this.ingredients.slice())
  //   return this.ingredients.slice()
  // }

//   addIngredient(ingredient:Ingredient){

//     this.ingredients.push(ingredient)





//   }

  addIngredients(ingredients: Ingredient[]){

    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice())
}


updateIngredient(index: number , newIngredient: Ingredient)
{
  this.ingredients[index] = newIngredient
  this.ingredientsChanged.next(this.ingredients.slice())
}
deleteIngredient(index:number)
{
  this.ingredients.splice(index, 1)
this.ingredientsChanged.next(this.ingredients.slice())
}


}
