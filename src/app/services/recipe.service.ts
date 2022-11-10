import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import {    Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
recipeChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService:ShoppingListService , private router : Router) { }



  private recipes : Recipe[] = [

    new Recipe(uuidv4(),'A Test Recipe',
    'this is a simply a test',
    'https://www.simplyrecipes.com/thmb/mbN8mXZ0srgAT1YrDU61183t0uM=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg',
    [
      new Ingredient('Meat',1),
      new Ingredient('French Fries',20)
    ])
  ,
  new Recipe(uuidv4(),'Big Fat Burger','this is a simply a test','https://www.seriouseats.com/thmb/gsco3uhFd26vcJNlJfJQi8tDs0g=/1125x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__09__20140918-jamie-olivers-comfort-food-insanity-burger-david-loftus-f7d9042bdc2a468fbbd50b10d467dafd.jpg',
  [
    new Ingredient('Rice',10),
    new Ingredient('French Fries',20)
  ])

  ]

  getRcipeById(id)
  {
   return this.recipes.find(a => a.id === id)
  }
  getRecipes(){
    return this.recipes.slice()
  }


  addIngredientToShoppingList(ingredient:Ingredient []){
    this.shoppingListService.addIngredients(ingredient)
  }

  addRecipe(recipe: Recipe){
//  let lastId =  this.recipes[this.recipes.length -1]
//  var newId =0
//  if(lastId){
//   newId = lastId.id +1;
//  }
//  else{
//   newId++;
//  }
//  recipe.id = newId+1;
recipe.id = uuidv4()
    this.recipes.push(recipe)
this.recipeChanged.next(this.recipes.slice())



  }

  updateRecipe(index : string, newRecipe: Recipe)
  {

  this.recipes = this.recipes.map(a=> a.id == newRecipe.id ? newRecipe:a)


    this.recipeChanged.next(this.recipes.slice())

  }


  deleteRecipe(index : string)
  {

    this.recipes = this.recipes.filter(a=> a.id != index)
    this.recipeChanged.next(this.recipes.slice())
    this.router.navigate(['/recipes'])
    console.log(index)
    console.log(this.recipes)

  }


}
