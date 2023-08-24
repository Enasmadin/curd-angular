import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { MatrialModule } from '../matrial/matrial.module';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LayoutComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    MatrialModule,
    SharedModule
  ]
})
export class DashbordModule { }
