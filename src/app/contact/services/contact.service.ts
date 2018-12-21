import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  getContactsUrl = "http://localhost/API/project-evolent/getContacts.php";
  addContactsUrl = "http://localhost/API/project-evolent/addContact.php";
  deleteContactsUrl = "http://localhost/API/project-evolent/deleteContact.php";

  constructor( private _http:Http ) { }

  getContacts( id = 0 ) {

      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');  

      let myParams = new URLSearchParams();
      if( 0 < id ) {
          myParams.append('id':number, id);
      }

      let options = new RequestOptions({ headers: myHeaders, params: myParams });

  		return this._http.get( this.getContactsUrl, options ).pipe(map( ( response: Response ) => response.json() ) );
  }

  addContact( objContact ) {

    		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      	let options = new RequestOptions({ headers: cpHeaders });

    		return this._http.post( this.addContactsUrl, objContact, options )
    						.pipe( map( ( response: Response ) => response.json() ) );
  }

  updateContact( objContact ) {

        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });

        return this._http.put( this.addContactsUrl, objContact, options )
                .pipe( map( ( response: Response ) => response.json() ) );
  }

  deleteContact( id ) {

        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });

        return this._http.delete( this.deleteContactsUrl + "?id=" + id, options )
                .pipe( map( ( response: Response ) => response.json() ) );
  }

}
