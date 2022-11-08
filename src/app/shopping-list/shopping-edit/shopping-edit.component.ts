import { Subscription } from 'rxjs';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy {
// @ViewChild('nameInput',{static : false}) nameInputRef: ElementRef;
// @ViewChild('amountInput',{static : false}) amountInputRef: ElementRef;
@ViewChild('f') slForm:NgForm
subscription : Subscription
editedMode = false
editedModeIndex:number
editedItem : Ingredient
  constructor(private shoppingListService :ShoppingListService) { }
  ngOnDestroy(): void {
  this.subscription.unsubscribe()
  }

  ngOnInit(): void {
this.subscription = this.shoppingListService.startedEditing.subscribe(
  (index: number) => {
    this.editedModeIndex = index
this.editedMode = true
this.editedItem = this.shoppingListService.getIndgredient(index)
this.slForm.setValue({
  name:this.editedItem.name,
  amount:this.editedItem.amount
})
}
)
  }

  onAddItem(form:NgForm)
  {
    // const ingName  = this.nameInputRef.nativeElement.value
    // const ingAmount = this.amountInputRef.nativeElement.value
const value = form.value
const newIngredient = new Ingredient(value.name,value.amount)
if(this.editedMode  )
{
this.shoppingListService.updateIngredient(this.editedModeIndex,newIngredient)
}else{
  this.shoppingListService.addIngredient(newIngredient)

}
this.editedMode = false
form.reset()
      console.log(newIngredient)
    }
onClear(){
  this.slForm.reset()
  this.editedMode = false
}
onDelete()
{
  this.shoppingListService.deleteIngredient(this.editedModeIndex)
  this.onClear()

}
}
