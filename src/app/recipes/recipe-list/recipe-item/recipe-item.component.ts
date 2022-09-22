import { Recipe } from './../../recipe.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input() recipe:Recipe
 @Output()     recipeSelected = new EventEmitter<number>()
      
  constructor() { }

  ngOnInit(): void {
  }

  onSelected()
  {
    // alert("")
      this.recipeSelected.emit(1);
  }
}
