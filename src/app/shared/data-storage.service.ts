import { RecipeService } from './../services/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map , tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recipeService:RecipeService) { }

storeRecipes( ){
const recipes = this.recipeService.getRecipes()
this.http.put('https://recipes-714bc-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(a =>{
  console.log(a)
})
}

fetchRecipes()
{
 return this.http.get<Recipe[]>('https://recipes-714bc-default-rtdb.firebaseio.com/recipes.json')
  .pipe(map(recipes => {
    return recipes.map(recipes =>{
      return {...recipes,ingredients:recipes.ingredients? recipes.ingredients :[]}
    } )
  }),
  tap((a:any) => {
    this.recipeService.setReicpes(a)
  }))


}
}
