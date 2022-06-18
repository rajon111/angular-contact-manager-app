import { Icontact } from './../../models/Icontact';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  public contacts: Icontact[]= [];
  public errorMessage: string | null = null

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data:Icontact[])=>{
      this.contacts = data;
      this.loading = false
    },(error)=>{
      this.errorMessage = error
      this.loading = false
    })
  }

}
