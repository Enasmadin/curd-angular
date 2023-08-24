import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTask } from '../context/create-task';
import { baseAPI } from '../context/baseURLS';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 

  constructor(private http:HttpClient) { }
  getAllTasks(filter:any){
    let params = new HttpParams()
    Object.entries(filter).forEach(([key ,value] :any)=>{
      if(value){
        params = params.append(key,value)
      
      }})
    
    // if(filter.keyword){
    //   params = params.append('keyword',filter.keyword)
    // }
   
    // return this.http.get( baseAPI + "/all-tasks", { params });
    return this.http.get(baseAPI + '/all-tasks', { params });
  }
  // getAllTasks(filter: any) {
  //   let params = new HttpParams();

  //   if (filter.keyword) {
  //     params = params.append('keyword', filter.keyword);
  //   }

  //   return this.http.get(baseAPI + '/all-tasks', { params });
  // }

  createTask(model:any){
    return this.http.post(  baseAPI+ "/add-task",model) ;
  }
  deleteTask( id:number){
     return this.http.delete(baseAPI + '/delete-task/' + id)
  }
   updateTask( modal:any, id:number){
     return this.http.put(baseAPI + '/edit-task/'+ id,modal )
  
  }


}
