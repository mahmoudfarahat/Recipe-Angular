

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './module/shared/header/header.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { FormsModule } from '@angular/forms';



import { CoreModule } from './core.module';
import { AuthModule } from './module/auth/auth.module';
import { IngredientsModule } from './module/ingredients/ingredients.module';
import { SharedModule } from './module/shared/shared.module';
import { ChefsModule } from './module/chefs/chefs.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    HttpClientModule,
    IngredientsModule,
    SharedModule,
    CoreModule,
    AuthModule,
    ChefsModule,

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
