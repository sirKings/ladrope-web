import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthServiceService {

user;
selectedCloth;
selectedOrder;

  constructor(public afAuth: AngularFireAuth) { 

  	
 }

}
