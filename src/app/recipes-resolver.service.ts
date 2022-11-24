import { RecipeService } from 'src/app/services/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from './recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService:DataStorageService , private recipeService:RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

  return this.dataStorageService.fetchRecipes()
 
  }



}