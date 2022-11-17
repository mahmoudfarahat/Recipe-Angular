import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Output() recipes:any =  new EventEmitter<any>()

  constructor(private dataStorageService:DataStorageService ) { }

  ngOnInit(): void {
  }

  onStoreRecipes(){
 this.dataStorageService.storeRecipes()
}
onFetchingRecipes(){
  this.dataStorageService.fetchRecipes().subscribe()
}
}
