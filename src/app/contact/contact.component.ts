import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts = [];

  constructor( private _contact: ContactService, private _router: Router, private route: ActivatedRoute ) {
  }

  ngOnInit() {
  		this._contact.getContacts()
  				.subscribe( resResponse => { this.contacts = resResponse } );
  }

  addContact() {
      this._router.navigate( ['addcontact'], {relativeTo: this.route});
  }

  editContact(id) {
      this._router.navigate( ['addcontact', id], {relativeTo: this.route} );
  }

  deleteContact(id) {
      console.log( "Delete contact : " + id );
      console.log( "Add record..." );
          this._contact.deleteContact( id )
                        .subscribe( resResponse => {console.log( resResponse ); } );

      setTimeout( () => {
        this._router.navigate( ['/contacts'] );
      }, 1000);
  }

}
