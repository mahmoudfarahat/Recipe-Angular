
import { Subject, Subscription } from 'rxjs';
import {
  Component,

  OnInit,

  OnDestroy,

} from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

import { Ingredient } from 'src/app/services/ingredients/ingredient.model';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {




  ingredientsChanged = new Subject<Ingredient[]>();

  subscription: Subscription;
  editedMode = false;
  editedModeIndex: number;
  editedItem: Ingredient;
  constructor(

    private ingredientsService: IngredientsService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      id:new FormControl(),
      name: new FormControl(),
      amount: new FormControl(),
    });




    this.subscription = this.ingredientsService.startedEditing.subscribe(
      (ingredient:any) => {


        this.editedMode = true;
        this.form.get('id').setValue(ingredient.id)
        this.form.get('name').setValue(ingredient.name)
        this.form.get('amount').setValue(ingredient.amount)




      }
    );
  }

  onAddItem() {
    if (this.editedMode) {
      this.ingredientsService.editIngredient(this.form.get('id').value,
      {
        name:this.form.get('name').value,
        amount:this.form.get('amount').value
      }).subscribe(ingredient=>{

    this.ingredientsService.submitData.next(ingredient)
      })

    } else {

      this.ingredientsService.postIngredient(this.form.value).subscribe((ingredient) => {
        this.ingredientsService.submitData.next(ingredient);
      });
    }
    this.editedMode = false;
    this.form.reset()
  }

  onClear() {
    this.form.reset()
    this.editedMode = false;
  }

  onDelete() {
    this.ingredientsService.delete( this.form.get('id').value).subscribe(ingredient =>{
    
      this.ingredientsService.submitData.next(ingredient);
    })
    this.onClear();
  }
}
