import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  
  {path:"" ,loadChildren:()=>import(`./dashbord/dashbord.module`).then(m=>m.DashbordModule)},
  {path:"login" ,loadChildren:()=>import(`./admin-auth/admin-auth.module`).then(m=>m.AdminAuthModule)},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
