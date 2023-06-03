import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit{
  signupform!:FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router){}
  ngOnInit(): void {
    this.signupform = this.fb.group({
      name:[''],
      email:[''],
      password:['']
    })
  }
  postuser(){
    this.http.post("http://localhost:3000/Signup",this.signupform.value).subscribe((res)=>{
      alert("user record has submit");
      this.signupform.reset();
      this.router.navigate(['/login']);
    },
    err=>{
      alert("error record not found");
    })
  }
}
