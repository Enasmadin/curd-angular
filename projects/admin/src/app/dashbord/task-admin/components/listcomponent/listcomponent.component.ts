import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
export interface Element {
  title: string;
  position: number;
  user: string;
  deadline: number;
  status: string;
  action: string;
  // image:string
}

@Component({
  selector: 'app-listcomponent',
  templateUrl: './listcomponent.component.html',
  styleUrls: ['./listcomponent.component.scss'],
  
})
export class ListcomponentComponent implements OnInit {
  p:any=1;
  filteration:any={
    page:this.p,
    limit:10
  };
  total:any;
  startDate: Date | null = null;
  endDate: Date | null = null;
  
  timeOutId:any;
  users:any[]=[{id:"647b3249566b3893b59f3e7b",name:"enas"},{id:"647b3292566b3893b59f3e82",name:"amira"}];
  status:any[]=[{name:"In-Progress"},{name:"complete"}];
  displayedColumns: string[] = [
    'position',
    'title',
    'user',
    'deadline',
    'status',
    'action',
  ];
  dataSource: any = [];
  dateAdapter: any;
  locale: any;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllTasks();
   
   
  }
  getAllTasks() {
    // this.spinner.show();
    this.taskService.getAllTasks(this.filteration).subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource = this.mappingTask(res.tasks);
        // this.spinner.hide();
        this.total=res.totalItems;
     
        // this.toastr.success("sucess get all tasks");
      },
      (error) => {
        // this.spinner.hide();
        // this.toastr.error(error.error.massage);
      }
    );
  }
  mappingTask(data: any[]) {
    let newTask = data.map((item: any) => {
      return {
        ...item,
        user: item.userId.username,
      };
    });
    return newTask;
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(AddTaskComponent, {
      width: '550px',
      disableClose : true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result == true) {
        this.getAllTasks();
      }
    });
  }
  deleteTask(id:number){
    this.spinner.show();
    this.taskService.deleteTask(id).subscribe((res:any)=>{
      this.spinner.hide();
      this.getAllTasks();

    },erorr=>{
      this.spinner.hide();

    }
    )
  }

  updateTask(element:any){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '550px',
      data:element,
     disableClose:true
    });

    dialogRef.afterClosed().subscribe((result) => {
    
    })
  }

  Search(event:any){
    this.filteration['page']=1
    this.p= 1;
   this.filteration ['keyword'] = event.value;
   clearTimeout(this.timeOutId);
    this.timeOutId= setTimeout(()=>{
      this.getAllTasks();
    },2000)
  }
  selectUser(event:any){
    console.log(event.value)
    this.filteration ['userId'] = event.value;
    this.getAllTasks();

  }
  selectProgress(event:any){
    this.filteration['status']= event.value.trim();
    this.getAllTasks();
  }
  selectDate(event:any , type:any){
    console.log(event);
    this.filteration[type]=  moment( event.value).format('DD-MM-YYYY');
    this.startDate= this.filteration['fromDate'];
    this.endDate=this.filteration['toDate'];
    if(type=='toDate' && this.filteration['toDate'] !== 'Invalid date'  ){
       this.getAllTasks
    }
    
  }

  changePage(event:any){
    this.filteration['page']=event
    this.p= event;
    this.getAllTasks()
  }
 
  
}
