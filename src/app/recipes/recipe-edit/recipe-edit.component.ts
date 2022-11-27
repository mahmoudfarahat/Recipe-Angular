
import { DataStorageService } from '../../services/data-storage.service';
import { Recipe } from './../recipe.model';
import { RecipeService } from './../../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id:string
editMode = false
recipeForm : FormGroup
  constructor(private route:ActivatedRoute ,
    private reciepeService: RecipeService ,
    private router : Router ,
    private dataStorageService:DataStorageService) { }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      'id' :new FormControl(),
      'name' : new FormControl( null, Validators.required),
      'imagePath' : new FormControl(null,Validators.required),
      'description' : new FormControl(null, Validators.required),
      'ingredients' :new FormArray([])
    })

    this.route.params.subscribe((param: Params) => {
      this.id =  param['id']
      this.editMode = param['id'] != null
      this.initForm()
    })
  }
  onSubmit(){


    if(this.editMode)
  {

    this.reciepeService.updateRecipe(this.id , this.recipeForm.value)
  //  console.log(this.recipeForm.value)
  }else{
    // console.log(this.recipeForm.value)
    this.reciepeService.addRecipe(this.recipeForm.value)


  }
  this.onCancel()

  }
  onCancel()
  {
    this.router.navigate(['../'], {relativeTo:this.route})
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
 this.dataStorageService.getById(this.id).subscribe(a => {
  console.log(a)
    this.recipeForm.get('name').setValue(a.name)
    this.recipeForm.get('imagePath').setValue(a.imagePath)
    this.recipeForm.get('description').setValue(a.description)
    // this.recipeForm.get('ingredients').setValue(a.ingredients)
for (let i = 0; i < a.ingredients.length; i++) {
  console.log(a.ingredients[i]);
  (this.recipeForm.get('ingredients') as FormArray).push(
    new FormGroup({
      'name':new FormControl(a.ingredients[i].name),
      'amount':new FormControl(a.ingredients[i].amount),
    })
  )
}
  })

  // console.log(recipe)
  // this.recipeForm.get('name').setValue(recipe.name);
      // const recipe = this.reciepeService.getRcipeById(this.id)
      // id= recipe.id
      // recipeName = recipe.name
      // recipeImagePath  = recipe.imagePath
      // recipDescription = recipe.description
      // if(recipe['ingredients']){
      //  for (let ingredient of recipe.ingredients)
      //  {
      //   recipingredients.push(new FormGroup({
      //     'name' : new FormControl(ingredient.name  ,Validators.required),
      //     'amount' : new FormControl(ingredient.amount , [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      //   }))
      //  }
      // }

    }


  }

  onDelete(index : number)
  {
(<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
}
