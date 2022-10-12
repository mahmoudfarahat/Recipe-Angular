import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

recipeSelected = new EventEmitter<Recipe>()

  private recipes : Recipe[] = [
    new Recipe('A Test Recipe',
    'this is a simply a test',
    'https://www.simplyrecipes.com/thmb/mbN8mXZ0srgAT1YrDU61183t0uM=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg',
    [
      new Ingredient('Meat',1),
      new Ingredient('French Fries',20)
    ])
  ,
  new Recipe('Big Fat Burger','this is a simply a test','https://www.seriouseats.com/thmb/gsco3uhFd26vcJNlJfJQi8tDs0g=/1125x1125/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__09__20140918-jamie-olivers-comfort-food-insanity-burger-david-loftus-f7d9042bdc2a468fbbd50b10d467dafd.jpg',
  [
    new Ingredient('Rice',10),
    new Ingredient('French Fries',20)
  ])

  ]


  getRecipes(){
    return this.recipes.slice()
  }
}
