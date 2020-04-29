import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/screens/users/users.component';
import { ControlsComponent } from './components/screens/controls/controls.component';



const routes: Routes = [{ path: "user", component: UsersComponent },
{ path: "controlsbyusername/:username", component: ControlsComponent }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
