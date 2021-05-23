import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAppComponent } from './create-app/create-app.component';
import { DeleteAppComponent } from './delete-app/delete-app.component';
import { ModifyAppComponent } from './modify-app/modify-app.component';
import { ViewAppComponent } from './view-app/view-app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import {BackendService} from './backend.service'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './view-app/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CreateAppComponent,
    DeleteAppComponent,
    ModifyAppComponent,
    ViewAppComponent,
    HomeComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(BackendService),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
