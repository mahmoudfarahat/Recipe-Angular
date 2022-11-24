import { Ingredient } from 'src/app/shared/ingredient.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {


  submitData = new BehaviorSubject<any>(null)
  constructor(private http:HttpClient) { }



  postIngredient(formData:any)
  {
      return this.http.post('https://recipes-714bc-default-rtdb.firebaseio.com/ingredients.json', formData)
  }

  getIngredients()
  {
    return this.http.get('https://recipes-714bc-default-rtdb.firebaseio.com/ingredients.json')

  }
}