import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { contact } from '../contactmodel';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit{
  data:undefined | contact[]
  constructor( private api:ApiService ){}

  ngOnInit(): void {
    this.getcontact()
  }

  getcontact(){
    this.api.getcontact().subscribe((res)=>{
      this.data = res;
    })
  }

  deletecontact(id:number|undefined){
    this.api.deletecontact(id).subscribe((res)=>{
      alert("Contact deleted successfully!!!")
      this.getcontact();
    })
  }

  logout(){
    localStorage.removeItem('logindata')
  }
}
