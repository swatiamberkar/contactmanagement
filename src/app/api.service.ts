import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contact, signup } from './component/contactmodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient) { }

  // Post method
  addcontact(data:contact){
    return this.http.post<contact>("http://localhost:3000/posts", data)
  }

  //Api method
  getcontact(){
    return this.http.get<contact[]>("http://localhost:3000/posts")
  }

  //delete method
  deletecontact(id:number|undefined){
    return this.http.delete<contact>("http://localhost:3000/posts/" + id)
  }

  //delete method
  fetchdata(id:number|undefined){
    return this.http.get<contact>("http://localhost:3000/posts/" + id)
  }

  // update data
  updatacontact(id:number, data:contact){
   return this.http.put<contact>("http://localhost:3000/posts/" + id, data)
  }

   // Post method - Add Signup
   addsignup(data:signup){
    return this.http.post<signup>("http://localhost:3000/signup", data)
  }
}
