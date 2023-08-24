import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogRef ,MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../components/confirmation/confirmation.component';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{
  [x: string]: any;
  users:any[]=[{id:"647b3249566b3893b59f3e7b",name:"enas"},{id:"647b3292566b3893b59f3e82",name:"amira"}]
  newFormData: any;
  formValues:any;
  constructor( private fb:FormBuilder, 
    private service:TaskService,
   private toastr:ToastrService,
   private spinner:NgxSpinnerService,
   public dialogRef: MatDialogRef<AddTaskComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any,
   private mataDialog: MatDialog

   ){}
  ngOnInit(): void {
    this.createForm();
    
  }
  createForm(){
    
    this.newTaskform=this.fb.group({
      title:[ this.data?.title||"",[Validators.required,Validators.minLength(5)]],
      userId:[this.data?.userId?.username||"",Validators.required],
      image:[ this.data?.image||"",Validators.required],
      deadline:[ this.data ? new Date(this.data ?.deadline.split('-').reverse().join('-')).toISOString():"" ,Validators.required],
      description:[ this.data?.description||"",Validators.required]
    })
    // console.log( "date" , new Date(this.data.deadline.split('-').reverse().join('-')))
     this.formValues=this.newTaskform.value
  }
  fileName="";
  newTaskform!:FormGroup;

  selectImage(event:any){ 
    this.fileName=event.target.value;
    this.newTaskform.get('image')?.setValue(event.target.files[0]);
    // console.log(event)

  }
  createTask(){
    // console.log(this.newTaskform.value);
    // let formData= new FormData();
    // formData.append('title',this.newTaskform.value['title']);
    // formData.append('userId',this.newTaskform.value['userId']);
    // formData.append('image',this.newTaskform.value['image']);
    // formData.append('deadline',this.newTaskform.value['deadline']);
    // formData.append('description',this.newTaskform.value['description']);
    
    // console.log(formData);
    this.spinner.show()
    let model= this.prepreFormData();
    this.service.createTask(model).subscribe((res:any)=>{
      this.toastr.success(res.massage,"sucess");
      this.spinner.hide();
      this.dialogRef.close(true);
      console.log(res.massage)

    },error=>{
      console.log(error.error.massage);
      this.toastr.error(error.error.massage);
      this.spinner.hide();

    })
  }

  prepreFormData(){
    let newData = moment(this.newTaskform.value['deadline']).format('DD-MM-YYYY');
    let formData= new FormData();
    Object.entries(this.newTaskform.value).forEach(([key,value]:any)=>{
      if(key == "deadline") {
        formData.append(key,newData)

      }
      else{
        formData.append(key,value)

      }
     
    })
    return formData;
  }
  updateTask(){
    this.spinner.show()
    let model= this.prepreFormData();
    this.service.updateTask(model,this.data._id).subscribe((res:any)=>{
      this.toastr.success("updateSuccesful","sucess");
      this.spinner.hide();
      this.dialogRef.close(true);
      console.log(res.massage)

    },error=>{
      this.toastr.error(error.error.massage)
     
      this.toastr.error("");
      this.spinner.hide();

    })

  }
  close(){
    let hasChanges=false;
    Object.keys(this.formValues).forEach((item:any)=>{
      if(this.formValues[item] !== this.newTaskform.value[item]){
        hasChanges=true
      }
      if(hasChanges){
        const dialogRef = this. mataDialog.open(ConfirmationComponent, {
          width: '550px',
         
        });
    
        dialogRef.afterClosed().subscribe((result) => {
        })
        
      }
      else{
        this.dialogRef.close();
      }
    })

   }


}
