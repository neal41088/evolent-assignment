import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactComponent }  from './contact.component';
import { AddcontactComponent }  from './addcontact/addcontact.component';

const routes: Routes = [
	{ 	  
	  path: '',
	  children: [ 
	  	{
		   path: '',
		   component: ContactComponent
		},
		{
		   path: 'addcontact',
		   component: AddcontactComponent
		},
		{
			path: 'addcontact/:id',
			component: AddcontactComponent
		}				
	  ]
    }
];

@NgModule({
  imports: [ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule]
})
export class ContactRoutingModule { } 