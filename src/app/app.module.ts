import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToDoComponent } from './to-do/to-do.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { UnfilteredComponent } from './unfiltered/unfiltered.component';
import { FilteredComponent } from './filtered/filtered.component';
@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    UnfilteredComponent,
    FilteredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
