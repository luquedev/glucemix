import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ControlsComponent } from './components/controls/controls.component';
import { NewcontrolComponent } from './components/newcontrol/newcontrol.component';


const routes: Routes = [
  { path: "home", component: HomeComponent, pathMatch: 'full' },
  { path: "newcontrol", component: NewcontrolComponent },
  { path: "contact", component: ContactComponent },
  { path: "controls/:id", component: ControlsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
