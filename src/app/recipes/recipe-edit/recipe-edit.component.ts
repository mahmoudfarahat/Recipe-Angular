import { Recipe } from './../recipe.model';
import { RecipeService } from './../../services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

    if(this.editMode)
  {
    this.reciepeService.updateRecipe(this.id , this.recipeForm.value)
  }else{
    this.reciepeService.addRecipe(this.recipeForm.value)


  }
  }

  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push (new FormGroup({
      'name': new FormControl(null, Validators.required),
            'amount': new FormControl( null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])

    }))
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm(){
    let id = ''
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
          'name' : new FormControl(ingredient.name  ,Validators.required),
          'amount' : new FormControl(ingredient.amount , [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
        }))
       }
      }
    }

this.recipeForm = new FormGroup({
  'id' :new FormControl(3 , Validators.required),
  'name' : new FormControl(recipeName , Validators.required),
  'recipeImagePath' : new FormControl(recipeImagePath,Validators.required),
  'recipDescription' : new FormControl(recipDescription, Validators.required),
  'ingredients' :recipingredients
})
  }
}
