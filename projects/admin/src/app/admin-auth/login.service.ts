import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login';
import { baseAPI } from '../dashbord/task-admin/context/baseURLS';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) {}
   
   
   Login(modal:Login){
    return this.http.post(baseAPI.replace('tasks','auth') + "/login",modal);
      
   }
}
