
import { Component,   OnInit } from '@angular/core';
import { Recipe } from '../../../services/recipes/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipes/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe

  id:string ;
  isLoading:boolean = true;

  constructor(private recipeService:RecipeService ,private route:ActivatedRoute , private router:Router) { }

  ngOnInit(): void {

this.route.params.subscribe(a => {
  this.id =  a.id


  this.recipeService.getById(a.id).subscribe(a=>{

    this.recipe ={...a,uuid:this.id}
    this.isLoading = false;
  });


})



  }

  onDeleteRecipe()
  {
    console.log(this.id)
    this.recipeService.deleteRecipe(this.id).subscribe(a =>{
      this.recipeService.recipes.next(a)
      this.router.navigate(['/recipes'])

    })


  }




}
