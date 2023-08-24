import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../login';
import { LoginService } from '../../login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm!:FormGroup;
  isLoading:boolean=false;

  constructor(private fb:FormBuilder,
    private loginService:LoginService,
    private toastr: ToastrService,
    private router:Router,
    private spinner: NgxSpinnerService
    
    ){}

  ngOnInit(): void {
    this.createForm()
  }
  //  create form
  createForm(){
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      role:['admin']
    })
  }

  // loginfunction  
  login(){
    const modal:Login= this.loginForm.value; 
    // this.isLoading=true;
    this.spinner.show();
    this.loginService.Login(modal).subscribe((res:any)=>{
      this.isLoading=false;
      this.toastr.success('sucess', 'sucess login');
      localStorage.setItem("token",res.token)
      this.router.navigate(['/tasks']);
      this.spinner.hide();


    },error=>{
      this.toastr.error(error.error.message);
      // console.log(error.error.message);
    })
     console.log(this.loginForm.value);
  }

}
