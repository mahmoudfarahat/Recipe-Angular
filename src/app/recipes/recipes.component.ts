import { DataStorageService } from '../services/data-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(public dataStorageService:DataStorageService) { }

  ngOnInit(): void {

  }

}
