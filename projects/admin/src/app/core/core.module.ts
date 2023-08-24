import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interseptors/auth.interceptor';
import { LoaderInterceptor } from './interseptors/loader.interceptor';
import { SharedModule } from '../shared/shared.module';
import { ErrorInterceptor } from './interseptors/error.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
  providers: [
    {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptor,
       multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
   },
   {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
 }
 ],
})
export class CoreModule { }
