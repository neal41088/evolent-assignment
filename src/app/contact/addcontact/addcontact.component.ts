import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ContactService } from '../services/contact.service';

import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit, AfterViewInit {

  id: number;
  contacts: Contact[] = [];
  updateContact: boolean = false;

  contactForm = new FormGroup({
  		id: new FormControl(),
      first_name: new FormControl('', [Validators.required]),
  		last_name: new FormControl('', [Validators.required]),
  		email: new FormControl('', [Validators.required, Validators.email]),
  		phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      status: new FormControl('Active', [Validators.required]),
  });

  constructor( private _contact: ContactService, private _router: Router, private _route: ActivatedRoute ) { }

  ngOnInit() {
      this.id = this._route.snapshot.params['id'];
  }

  ngAfterViewInit() {
      if( this.id > 0 ) {

          this._contact.getContacts( this.id )
              .subscribe( resResponse => { 
                  this.contacts = resResponse;

                  this.updateContact = true;

                  let editContact = this.contacts.pop();

                  this.contactForm.patchValue( {
                                                  'id': editContact.id,
                                                  'first_name': editContact.first_name,
                                                  'last_name': editContact.last_name,
                                                  'email': editContact.email,
                                                  'phone': editContact.phone,
                                                  'status': editContact.status,
                                              } );
               } );

      }
  }

  saveContact() {
      console.log( this.contactForm.value );
      if( !!this.contactForm.value.id ) {
      console.log( "Update record... : " + this.contactForm.value.id );
          this._contact.updateContact( this.contactForm.value )
                        .subscribe( resResponse => {console.log( resResponse ); } );
      } else {
      console.log( "Add record..." );
          this._contact.addContact( this.contactForm.value )
                        .subscribe( resResponse => {console.log( resResponse ); } );
      }

      setTimeout( () => {
        this._router.navigate( ['/contacts'] );
      }, 1000);
  }

}
