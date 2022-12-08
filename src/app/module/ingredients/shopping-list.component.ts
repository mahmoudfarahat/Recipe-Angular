
 import { Ingredient } from '../../services/ingredients/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { RecipeService } from 'src/app/services/recipes/recipe.service';



@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;
  constructor(

    private ingredientsService: IngredientsService,
  ) {}

  ngOnInit(): void {

    this.igChangeSub =this.ingredientsService.submitData.subscribe(c=>{
    this.ingredientsService.getIngredients().subscribe((ingredients) => {
      let newArray = [];
      for (let ingredient in ingredients) {
        newArray.push({ id: ingredient, ...ingredients[ingredient] });
      }
      this.ingredients = newArray;
      console.log(newArray);
    });
  })


  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    // console.log(this.ingredients[index]['id'])
   let  id  = this.ingredients[index]['id']
console.log(this.ingredients[index]['id'])

this.ingredientsService.getIngredientById(this.ingredients[index]['id']).subscribe(a => {

    this.ingredientsService.startedEditing.next({...a,id:id});

})
  }
}
