import { DataStorageService } from './../services/data-storage.service';
import { IngredientsService } from './../services/ingredients.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

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
    private dataStorageService:DataStorageService
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
