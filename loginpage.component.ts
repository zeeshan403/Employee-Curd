import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit{
  loginform!:FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router){}
  ngOnInit(): void {
    this.loginform = this.fb.group({
      email:[''],
      password:['']
    })
  }
  getuser(){
     this.http.get<any>("http://localhost:3000/Signup").subscribe((res)=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginform.value.email && a.password === this.loginform.value.password
      })
      if(user){
         alert("login successful");
         this.loginform.reset();
         this.router.navigate(['/userlist']);
      }
      else{
        alert("user not fount error");
      }
     })
  }
}
