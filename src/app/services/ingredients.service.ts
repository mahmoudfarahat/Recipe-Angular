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

  getIngredientById(id:string){
    return this.http.get<any>(`https://recipes-714bc-default-rtdb.firebaseio.com/ingredients/${id}.json`);
  }

  editIngredient(id:string ,fromData)
  {
    return this.http.put<any>(`https://recipes-714bc-default-rtdb.firebaseio.com/ingredients/${id}.json` , fromData);

  }
  delete(id:string  )
  {
    return this.http.delete<any>(`https://recipes-714bc-default-rtdb.firebaseio.com/ingredients/${id}.json` );

  }
}
