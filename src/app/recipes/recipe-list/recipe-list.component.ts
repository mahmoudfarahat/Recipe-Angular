import { Subscription } from 'rxjs';
import { Recipe } from './../recipe.model';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {

   subscription:Subscription

  recipes : Recipe[]
  constructor(private recipeService: RecipeService) { }
  ngOnDestroy(): void {
   this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged.subscribe((recipes : Recipe[]) =>
{
  this.recipes = recipes
}
    )
    this.recipes = this.recipeService.getRecipes()
  }
//   onRecipeSelected(recipe: Recipe,any:any){
// this.reciprWasSelected.emit(recipe)
// console.log(any);
//   }
}
