
import { Recipe } from './../recipe.model';
import { RecipeService } from './../../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: string;
  editMode = false;
  recipeForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private reciepeService: RecipeService,
    private router: Router,
    private recipeService:RecipeService
  ) {}

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      imagePath: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      ingredients: new FormArray([]),
    });

    this.route.params.subscribe((param: Params) => {
      this.id = param['id'];
      this.editMode = param['id'] != null;
      this.initForm();
    });
  }
  onSubmit() {
    if (this.editMode) {
      this.reciepeService
        .updateRecipe(this.id, this.recipeForm.value)
        .subscribe((a) => {
          console.log(a);
    this.reciepeService.recipes.next(a)

        });
    } else {
      this.reciepeService.addRecipe(this.recipeForm.value);

    }



    this.onCancel();
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    if (this.editMode) {
      this.reciepeService.getById(this.id).subscribe((a) => {
        console.log(a);
        this.recipeForm.get('name').setValue(a.name);
        this.recipeForm.get('imagePath').setValue(a.imagePath);
        this.recipeForm.get('description').setValue(a.description);
        // this.recipeForm.get('ingredients').setValue(a.ingredients)
        for (let i = 0; i < a.ingredients.length; i++) {
          console.log(a.ingredients[i]);
          (this.recipeForm.get('ingredients') as FormArray).push(
            new FormGroup({
              name: new FormControl(a.ingredients[i].name),
              amount: new FormControl(a.ingredients[i].amount),
            })
          );
        }
      });
    }
  }

  onDelete(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
