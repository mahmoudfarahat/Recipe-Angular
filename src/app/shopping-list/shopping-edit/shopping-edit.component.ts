import { IngredientsService } from './../../services/ingredients.service';
import { Subject, Subscription } from 'rxjs';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  OnDestroy,
  Input,
} from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput',{static : false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput',{static : false}) amountInputRef: ElementRef;



  ingredientsChanged = new Subject<Ingredient[]>();

  subscription: Subscription;
  editedMode = false;
  editedModeIndex: number;
  editedItem: Ingredient;
  constructor(
    private shoppingListService: ShoppingListService,
    private ingredientsService: IngredientsService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(),
      amount: new FormControl(),
    });




    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedModeIndex = index;
        this.editedMode = true;
        this.editedItem = this.shoppingListService.getIndgredient(index);

      }
    );
  }

  onAddItem() {
    if (this.editedMode) {
      // this.shoppingListService.updateIngredient(this.editedModeIndex,newIngredient)
    } else {
      // this.shoppingListService.addIngredient(newIngredient)
      this.ingredientsService.postIngredient(this.form.value).subscribe((a) => {
        
      });
    }
    this.editedMode = false;
    // form.reset()
    // console.log(newIngredient)
  }

  onClear() {

    this.editedMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedModeIndex);
    this.onClear();
  }
}
