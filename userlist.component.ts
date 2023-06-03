import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Uesr } from 'src/app/uesr';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{
  datalist:any;
  addbtn!:boolean;
  upbtn!:boolean;
  userobj:Uesr = new Uesr;
  userform!:FormGroup;
  constructor(private api:ApiService,private fb:FormBuilder){this.getuser();}
  ngOnInit(): void {
    this.userform = this.fb.group({
      name:[''],
      age:[''],
      address:['']
    })
  }
  allbtn(){
     this.upbtn=false;
     this.addbtn=true
  }
  getuser(){
    this.api.getdata().subscribe((res)=>{
       this.datalist=res;
    })
  }
  postuser(){
    // console.log(this.userform.value);
    this.userobj.name = this.userform.value.name;
    this.userobj.age = this.userform.value.age;
    this.userobj.address = this.userform.value.address;

    this.api.postdata(this.userobj).subscribe((res)=>{
       alert("user data as submit");
       this.userform.reset();
       let ref = document.getElementById('cancel')
       ref?.click();
       this.getuser();
    },
    err=>{
      alert("found error");
    })
  }
  deleteuser(id:number){
    this.api.deletedata(id).subscribe((res)=>{
      this.getuser();
    })
  }
  updateuser(list:any){
    this.addbtn=false;
    this.upbtn=true;
    this.userobj.id=list.id;
    this.userform.controls['name'].setValue(list.name);
    this.userform.controls['age'].setValue(list.age);
    this.userform.controls['address'].setValue(list.address);
  }
  putuser(){
    this.userobj.name = this.userform.value.name;
    this.userobj.age = this.userform.value.age;
    this.userobj.address = this.userform.value.address;
      
    this.api.putdata(this.userobj,this.userobj.id).subscribe((res)=>{
      alert("user data as update");
      this.userform.reset();
      let ref = document.getElementById('cancel')
      ref?.click();
      this.getuser();
    },
    err=>{
      alert("error not update");
    })
  }
}


