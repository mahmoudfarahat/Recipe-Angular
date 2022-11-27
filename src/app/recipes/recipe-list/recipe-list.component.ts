import { DataStorageService } from '../../services/data-storage.service';
import { Subscription } from 'rxjs';
import { Recipe } from './../recipe.model';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {

  //  subscription:Subscription

  recipes : Recipe[]
  constructor( private dataStorageService: DataStorageService) { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.dataStorageService.fetchRecipes().subscribe(a=>
      {
        this.recipes=a
        console.log(this.recipes)
      });


  }

}
