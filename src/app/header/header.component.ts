import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
islogged = false
private userSub : Subscription
@Output() recipes:any =  new EventEmitter<any>()

  constructor(private dataStorageService:DataStorageService, private auth:AuthService ) { }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(a => {
      this.islogged =!!a
      console.log(a)
    })
  }

  onStoreRecipes(){
 this.dataStorageService.storeRecipes()
}
onFetchingRecipes(){
  this.dataStorageService.fetchRecipes().subscribe()
}
logout()
{
  this.auth.logout()
}
}
