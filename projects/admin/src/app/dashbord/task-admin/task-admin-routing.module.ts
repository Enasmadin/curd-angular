import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListcomponentComponent } from './components/listcomponent/listcomponent.component';

const routes: Routes = [
  {path:"" , component:ListcomponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskAdminRoutingModule { }
