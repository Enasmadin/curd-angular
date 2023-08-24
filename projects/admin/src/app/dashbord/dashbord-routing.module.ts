import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path:"",
    component:LayoutComponent,
    children:[
      {path:"tasks",loadChildren:()=>import(`./task-admin/task-admin.module`).then(m=>m.TaskAdminModule)},
      {path:"users",loadChildren:()=>import(`./manageuser/manageuser.module`).then(m=>m.ManageuserModule)}

    ]
  }
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }
