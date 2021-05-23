import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAppComponent } from './create-app/create-app.component';
import { DeleteAppComponent } from './delete-app/delete-app.component';
import { ModifyAppComponent } from './modify-app/modify-app.component';
import { ViewAppComponent } from './view-app/view-app.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
    {path: 'create' , component: CreateAppComponent},
    {path: 'home' , component: HomeComponent},
    {path: '', redirectTo:'/home', pathMatch: 'full'},  
    {path: 'delete' , component: DeleteAppComponent},
    {path: 'modify' , component: ModifyAppComponent},
    {path: 'view' , component: ViewAppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
