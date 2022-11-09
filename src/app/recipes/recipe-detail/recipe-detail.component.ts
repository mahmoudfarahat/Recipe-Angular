import { RecipeService } from 'src/app/services/recipe.service';
import { Component,   OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe

  id:string ;

  constructor(private recipeService:RecipeService ,private route:ActivatedRoute , private router:Router) { }

  ngOnInit(): void {

this.route.params.subscribe(a => {
  this.id =  a.id
  this.recipe = this.recipeService.getRcipeById(this.id)


})



  }
  onAddToShoppingList(){
this.recipeService.addIngredientToShoppingList(this.recipe.ingredients)
  }

  onDeleteRecipe()
  {
    console.log(this.id)
    this.recipeService.deleteRecipe(this.id)

  }




}
