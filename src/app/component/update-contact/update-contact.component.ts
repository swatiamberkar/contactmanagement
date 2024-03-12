import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { contact } from '../contactmodel';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {

  public contactid!:number;
  public contactdata:contact = {} as contact;

  constructor( private api:ApiService,
                private activatedroute:ActivatedRoute,
                private router:Router){}

  ngOnInit(): void {

   this.activatedroute.params.subscribe((param:Params)=>{
    this.contactid = param['id']
   })

   this.api.fetchdata(this.contactid).subscribe((data:contact)=>{
    this.contactdata = data
    console.log(this.contactdata);
    
   })
  }

  updatecontact(){
    this.api.updatacontact(this.contactid, this.contactdata).subscribe((res:contact)=>{
      alert("Data updated successfully!!!")
      this.router.navigate(['/contactlist'])
    })
  }

}
