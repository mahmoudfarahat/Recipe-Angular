
 import { Ingredient } from '../../services/ingredients/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;
  constructor(
    private shoppingListService: ShoppingListService,
    private ingredientsService: IngredientsService,
    private recipeService:RecipeService
  ) {}

  ngOnInit(): void {

    this.igChangeSub =this.ingredientsService.submitData.subscribe(c=>{
    this.ingredientsService.getIngredients().subscribe((a) => {
      let newArray = [];
      for (let element in a) {
        newArray.push({ id: element, ...a[element] });
      }
      this.ingredients = newArray;
      console.log(newArray);
    });
  })

    // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //     console.log(ingredients)
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    // console.log(this.ingredients[index]['id'])
   let  id  = this.ingredients[index]['id']
console.log(this.ingredients[index]['id'])

this.ingredientsService.getIngredientById(this.ingredients[index]['id']).subscribe(a => {

    this.shoppingListService.startedEditing.next({...a,id:id});

})
  }
}
