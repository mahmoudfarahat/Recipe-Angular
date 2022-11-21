
import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../services/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map , take, tap,exhaustMap } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient  , private auth:AuthService) { }

// storeRecipes( ){
// const recipes = this.recipeService.getRecipes()
// this.http.put('https://recipes-714bc-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(a =>{
//   console.log(a)
// })
// }

fetchRecipes()
{

    return this.http.get<Recipe[]>('https://recipes-714bc-default-rtdb.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
      if(recipes){
        recipes = Object.values(recipes)
        return recipes.map(recipes =>{
          return {...recipes,ingredients:recipes.ingredients? recipes.ingredients :[]}
        } )
      }

  }))
}


postRecipe(recipe:Recipe)
{
  return this.http.post<Recipe[]>('https://recipes-714bc-default-rtdb.firebaseio.com/recipes.json',recipe)
}
}
