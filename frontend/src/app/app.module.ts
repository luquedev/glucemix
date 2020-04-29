import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/screens/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { ControlsComponent } from './components/screens/controls/controls.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
