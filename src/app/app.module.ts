

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { navComponent } from './module/shared/nav/nav.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { FormsModule } from '@angular/forms';



import { CoreModule } from './core.module';
import { AuthModule } from './module/auth/auth.module';
import { IngredientsModule } from './module/ingredients/ingredients.module';
import { SharedModule } from './module/shared/shared.module';
import { ChefsModule } from './module/chefs/chefs.module';
import { FooterComponent } from './module/shared/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    navComponent,
    FooterComponent

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
