import { RecipeService } from './../../services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id:number
editMode = false
recipeForm : FormGroup
  constructor(private route:ActivatedRoute ,private reciepeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id']
      this.editMode = param['id'] != null
      this.initForm()
    })
  }
  onSubmit(){
    console.log(this.recipeForm)
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm(){
    let recipeName = ''
    let recipeImagePath = ''
    let recipDescription = ''
    let recipingredients = new FormArray([])
    if(this.editMode)
    {
      const recipe = this.reciepeService.getRcipeById(this.id)
      recipeName = recipe.name
      recipeImagePath  = recipe.imagePath
      recipDescription = recipe.description
      if(recipe['ingredients']){
       for (let ingredient of recipe.ingredients)
       {
        recipingredients.push(new FormGroup({
          'name' : new FormControl(ingredient.name),
          'amount' : new FormControl(ingredient.amount)
        }))
       }
      }
    }

this.recipeForm = new FormGroup({
  'name' : new FormControl(recipeName),
  'recipeImagePath' : new FormControl(recipeImagePath),
  'recipDescription' : new FormControl(recipDescription),
  'ingredients' :recipingredients
})
  }
}
