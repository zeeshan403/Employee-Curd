import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Uesr } from './uesr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getdata():Observable<Uesr>{
    return this.http.get<Uesr>("http://localhost:3000/employee");
  }

  postdata(use:Uesr):Observable<Uesr>{
    return this.http.post<Uesr>("http://localhost:3000/employee",use);
  }

  deletedata(id:number):Observable<Uesr>{
    return this.http.delete<Uesr>(`http://localhost:3000/employee/${id}`);
  }
  putdata(use:Uesr,id:number):Observable<Uesr>{
    return this.http.put<Uesr>(`http://localhost:3000/employee/${id}`,use);
  }
}
