
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
      (a :any) => {
      console.log(a)

        this.editedMode = true;
        this.form.get('id').setValue(a.id)
        this.form.get('name').setValue(a.name)
        this.form.get('amount').setValue(a.amount)
        console.log(this.form.value)



      }
    );
  }

  onAddItem() {
    if (this.editedMode) {
      this.ingredientsService.editIngredient(this.form.get('id').value,
      {
        name:this.form.get('name').value,
        amount:this.form.get('amount').value
      }).subscribe(a=>{

    this.ingredientsService.submitData.next(a)
      })

    } else {

      this.ingredientsService.postIngredient(this.form.value).subscribe((a) => {
        this.ingredientsService.submitData.next(a);
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
    this.ingredientsService.delete( this.form.get('id').value).subscribe(a =>{
      console.log(a)
      this.ingredientsService.submitData.next(a);
    })
    this.onClear();
  }
}
