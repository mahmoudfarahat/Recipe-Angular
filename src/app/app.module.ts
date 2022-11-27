import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { IngredientsModule } from './shopping-list/ingredients.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { RecipeModule } from './recipes/recipe.module';

import { CoreModule } from './core.module';

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

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
