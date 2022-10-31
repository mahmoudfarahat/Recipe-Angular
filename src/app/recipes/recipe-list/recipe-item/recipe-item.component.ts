import { Recipe } from './../../recipe.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input() recipe:Recipe
//  @Output()     recipeSelected = new EventEmitter<number>()

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

//   onSelected()
//   {
//     // alert("")
//       // this.recipeSelected.emit(1);
// this.recipeService.recipeSelected.emit(this.recipe)

//   }
}
