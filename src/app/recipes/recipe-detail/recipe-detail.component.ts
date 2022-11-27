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

  constructor(private recipeService:RecipeService , private dataStorageService:DataStorageService,private route:ActivatedRoute , private router:Router) { }

  ngOnInit(): void {

this.route.params.subscribe(a => {
  this.id =  a.id


  this.dataStorageService.getById(a.id).subscribe(a=>{

    this.recipe ={...a,uuid:this.id}
    this.isLoading = false;
  });


})



  }

  onDeleteRecipe()
  {
    console.log(this.id)
    this.dataStorageService.deleteRecipe(this.id).subscribe(a =>{
      console.log(a)
    })
    

  }




}
