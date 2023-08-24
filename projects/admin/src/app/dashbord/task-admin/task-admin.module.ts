import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskAdminRoutingModule } from './task-admin-routing.module';
import { ListcomponentComponent } from './components/listcomponent/listcomponent.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { MatrialModule } from '../../matrial/matrial.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ListcomponentComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    TaskAdminRoutingModule,
    MatrialModule,
    RouterModule,
  
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class TaskAdminModule { }
