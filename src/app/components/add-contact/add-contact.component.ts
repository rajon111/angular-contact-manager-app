import { Route, Router } from '@angular/router';
import { ContactService } from './../../services/contact.service';
import { IGroup } from './../../models/IGroup';
import { Icontact } from './../../models/Icontact';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false
  public contact: Icontact ={} as Icontact
  public errorMessage: string | null = null
  public groups : IGroup[] = [] as IGroup[]

  constructor(private contactService : ContactService,
    private router: Router) { }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data:IGroup[])=>{
      this.groups = data
    },(error)=>{
      this.errorMessage = error
    })
  }
 public createSubmit(){
    this.contactService.createContact(this.contact).subscribe((data:Icontact)=>{
      this.router.navigate(['/']).then()
    },(error=>{
      this.errorMessage = error
      this.router.navigate(['/contacts/add']).then()
    }))
  }

}
