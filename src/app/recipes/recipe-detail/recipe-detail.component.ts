import { DataStorageService } from '../../services/data-storage.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Component,   OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe

  id:string ;
  isLoading:boolean = true;

  constructor(private recipeService:RecipeService , private DataStorageService:DataStorageService,private route:ActivatedRoute , private router:Router) { }

  ngOnInit(): void {

this.route.params.subscribe(a => {
  this.id =  a.id

//  this.recipeService.getRcipeById().subscribe(a =>{
//   this.recipe = a.find(a => a.id == this.id)
//  })
  this.DataStorageService.getById(a.id).subscribe(a=>{

    this.recipe =a
    this.isLoading = false;
  });


})



  }
  onAddToShoppingList(){
this.recipeService.addIngredientToShoppingList(this.recipe.ingredients)
  }

  onDeleteRecipe()
  {
    console.log(this.id)
    this.recipeService.deleteRecipe(this.id)

  }




}
