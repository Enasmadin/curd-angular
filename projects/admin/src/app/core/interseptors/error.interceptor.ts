import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor( private toster :ToastrService ,  private router :Router) {
    
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error:HttpErrorResponse)=>{
      this.toster.error(error.error.message
        );
      console.log(error.error ,"error");

      if(error.error.message == 'jwt expired ' || error.error.message == 'jwt must provided ') {
          this.router.navigate(['/login']);
          localStorage.removeItem('token')
      }
     throw error ;
    }));
  }
}
