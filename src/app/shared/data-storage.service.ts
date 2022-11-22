
import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../services/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map , take, tap,exhaustMap } from 'rxjs/operators';
import { pipe, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {


  public recipeAdding = new Subject();
  public isloading = false;
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
        var currentArray = [];
        for(var key in recipes){
          console.log(key);
          currentArray.push({uuid:key, ...recipes[key]});
        }
        // console.log(recipes)
        // recipes = Object.values(recipes)
        // console.log(recipes)
        // return recipes.map(recipes =>{
        //   return {...recipes,ingredients:recipes.ingredients? recipes.ingredients :[]}
        // } )

        console.log(currentArray);
        return currentArray;
      }

  }))
}



postRecipe(recipe:Recipe)
{

  return this.http.post<Recipe[]>('https://recipes-714bc-default-rtdb.firebaseio.com/recipes.json',recipe);

}

getById(id:string){
  return this.http.get<any>(`https://recipes-714bc-default-rtdb.firebaseio.com/recipes/${id}.json`);
}

}
