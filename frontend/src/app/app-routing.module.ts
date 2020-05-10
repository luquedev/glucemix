import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ControlsComponent } from './components/controls/controls.component';
import { NewcontrolComponent } from './components/newcontrol/newcontrol.component';
import { RegisterComponent } from './components/userAuth/register/register.component';
import { LoginComponent } from './components/userAuth/login/login.component';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
  { path: "home", component: HomeComponent, pathMatch: 'full' },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent, pathMatch: 'full' },
  { path: "newcontrol", component: NewcontrolComponent },
  { path: "contact", component: ContactComponent },
  { path: "control/:id", component: ControlsComponent },
  { path: "control", component: ControlsComponent },
  { path: '**', component: Page404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
