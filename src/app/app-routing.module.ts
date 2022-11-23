
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '' , redirectTo : '/recipes' ,pathMatch:"full"},
  {path:'recipes', loadChildren: () => import('./recipes/recipe.module').then(mod => mod.RecipeModule)},
  {path:'shopping-list',loadChildren: () => import('./shopping-list/shopping.module').then(mod => mod.ShoppingModule)},
  {path:'auth',loadChildren:()=> import('./auth/auth.module').then(mod => mod.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
