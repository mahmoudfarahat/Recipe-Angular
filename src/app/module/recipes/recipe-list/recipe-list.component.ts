

import { Recipe } from '../../../services/recipes/recipe.model';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { RecipeService } from 'src/app/services/recipes/recipe.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {

  //  subscription:Subscription

  recipes : Recipe[]
  constructor(  private recipeService:RecipeService) { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.recipeService.recipes.subscribe(a => {
      console.log(a)
      this.recipeService.fetchRecipes().subscribe(a=>
        {
          this.recipes=a

        });
    })
  }
}
