import { Subscription } from 'rxjs';


import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/app/services/recipes/recipe.service';
import { AuthService } from '../../../services/user/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
islogged = false
private userSub : Subscription
@Output() recipes:any =  new EventEmitter<any>()

  constructor( private recipeService:RecipeService, private auth:AuthService ) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(a => {
      this.islogged =!!a
      // console.log(a)
    })
  }

  onStoreRecipes(){
//  this.dataStorageService.storeRecipes()
}
onFetchingRecipes(){
  this.recipeService.fetchRecipes().subscribe()
}
logout()
{
  this.auth.logout()
}
}
