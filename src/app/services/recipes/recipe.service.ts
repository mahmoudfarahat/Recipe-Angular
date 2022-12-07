

import { Recipe } from '../recipes/recipe.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map , take, tap,exhaustMap } from 'rxjs/operators';
import { pipe, BehaviorSubject, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../user/auth.service';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public recipes = new BehaviorSubject<Recipe[]>(null)

  public recipeAdding = new Subject();

  public isloading = false;
  constructor(private http:HttpClient  , private auth:AuthService) { }

 

fetchRecipes()
{

    return this.http.get<Recipe[]>('https://recipes-714bc-default-rtdb.firebaseio.com/recipes.json')
    .pipe(map(recipes => {
      if(recipes){
        var currentArray = [];
        for(var key in recipes){
          // console.log(key);
          currentArray.push({uuid:key, ...recipes[key]});
        }
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

updateRecipe(id:string ,formData){
  return this.http.put<any>(`https://recipes-714bc-default-rtdb.firebaseio.com/recipes/${id}.json`, formData);
}
deleteRecipe(id : string)
{
  return this.http.delete<any>(`https://recipes-714bc-default-rtdb.firebaseio.com/recipes/${id}.json`);
}


recipess:Recipe[];






addRecipe(recipes: Recipe){

recipes.id = uuidv4()
this.postRecipe(recipes).subscribe(a => {
console.log(a)
this.recipes.next(a)

})

}
}
