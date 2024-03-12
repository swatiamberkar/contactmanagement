import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login, signup } from '../contactmodel';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  
  isshow = false;
  signupform!:FormGroup;
  loginform!:FormGroup;

  constructor(  private formBuilder:FormBuilder,
                private http:HttpClient,
                private router:Router,
                private api:ApiService ){}
                
  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    //login
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }


  
  signup(){
    this.isshow = true;
  }

  login(){
    this.isshow = false;
  }

  // submitsignup(){
  //   return this.http.post<signup>("http://localhost:3000/signup", this.signupform.value).subscribe((res)=>{
  //     alert("User sigeup successfully!!!");
  //     this.signupform.reset();
  //   })
  // }

  submitsignup(data:signup){

    // console.log(this.signupform.value);
     this.api.addsignup(data).subscribe((res)=>{
      alert("User signup successfully!!!");
      this.signupform.reset();
    })
  }

  loginuser(){
    return this.http.get<login[]>("http://localhost:3000/signup").subscribe((res)=>{
      //matching email & password
      const user = res.find((a:any)=>{
        return a.email == this.loginform.value.email && a.password == this.loginform.value.password
      })

      // check condition for login
      if(user)
      {
        alert("Login successfully!!!");
      this.loginform.reset();
      this.router.navigate(['/contactlist'])

      // storing data in local storage
      localStorage.setItem('logindata', JSON.stringify(user))
      }
      else{
        alert("User not found with these creadentials.");
        this.loginform.reset();
      }
    },err=>{
      alert("Something went wrong, try after somethime");
      this.loginform.reset();
    } )
  }
}
