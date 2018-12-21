import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent }  from './contact/contact.component';

const routes: Routes = [
	{
	   path: '',
	   redirectTo: '',
	   pathMatch: 'full'
	},
	{
	   path: 'contacts',
       loadChildren: './contact/contact.module#ContactModule'
	}
];
 
@NgModule({
  imports: [ 
          RouterModule.forRoot(routes) 
  ],
  exports: [ 
          RouterModule 
  ]
})
export class AppRoutingModule{ }