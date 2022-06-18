import { IGroup } from './../models/IGroup';
import { Icontact } from './../models/Icontact';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    // private serviceUrl = `http://localhost:9000`; //json server url
    private serviceUrl = `http://localhost:9000`;

  constructor(private httpClient: HttpClient) { 

  }
  //get all contacts

 public getAllContacts():Observable<Icontact[]>{
  let dataURL:string = `${this.serviceUrl}/contacts`
  return this.httpClient.get<Icontact[]>(dataURL).pipe(catchError(this.handleError));
 }

 //get single Contact
 public getContact(contactId : string): Observable<Icontact>{
  let dataURL : string = `{this.serviceUrl}/contacts/${contactId}`;
  return this.httpClient.get<Icontact>(dataURL).pipe(catchError(this.handleError));
 }

 //create contact
 public createContact(contact:Icontact):Observable<Icontact>{
  let dataURL:string = `${this.serviceUrl}/contacts`
  return this.httpClient.post<Icontact>(dataURL,contact).pipe(catchError(this.handleError));
 }
 

 //update contact
 public updateContact(contact:Icontact,contactId : string ):Observable<Icontact>{
  let dataURL:string = `${this.serviceUrl}/contacts/${contactId}`
  return this.httpClient.put<Icontact>(dataURL,contact).pipe(catchError(this.handleError));
 }

 //delete contact
 public deleteContact(contactId : string ):Observable<{}>{
  let dataURL:string = `${this.serviceUrl}/contacts/${contactId}`
  return this.httpClient.delete<{ }>(dataURL).pipe(catchError(this.handleError));
 }

 //get all groups

 public getAllGroups():Observable<IGroup[]>{
  let dataURL:string =`${this.serviceUrl}/groups`
  return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError))
 }

//  //get single Contact
//  public Group(contact: Ic{
//   let dataURL : string = `{this.serviceUrl}/contacts/${contactId}`
//   return this.httpClient.get<Icontact[]>(dataURL).pipe(catchError(this.handleError));
//  }


  // error handle
  public handleError(error:HttpErrorResponse){
    let errorMessage:string ='';
    if(error.error instanceof ErrorEvent){
      //CLIENT ERROR
            errorMessage = `Error: ${error.error.message}`;
  }else{
    //server error
    errorMessage =`Status: ${error.status} \n Message: ${error.message}`;
  }
  return throwError(errorMessage)
  }
}
