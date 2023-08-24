import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private fb:FormBuilder){}
  loginForm!:FormGroup;
  isLoading:boolean=false;

  ngOnInit(): void {
    this.createForm()
  }
  //  create form
  createForm(){
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    })
  }

  // loginfunction  
  login(){
    
     console.log(this.loginForm.value);
  }

}
