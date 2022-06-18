import { ContactService } from './../../services/contact.service';
import { Icontact } from './../../models/Icontact';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public loading:boolean = false
  public contactId : string | null = null;
  public contact: Icontact = {} as Icontact;
  public errorMessage: string | null = null;

  constructor( private activatedRoute: ActivatedRoute,
    private contactService : ContactService) {

   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap)=>{
      this.contactId = param.get('contactId')
    });
    if(this.contactId){
      this.loading = true
      this.contactService.getContact(this.contactId).subscribe((data:Icontact)=>{
        this.contact = data
        this.loading = false
      },(error)=>{
        this.errorMessage = error
        this.loading = false
      })
    }
  }

}
