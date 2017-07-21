import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthServiceService {

user;
uid;
selectedCloth;
selectedOrder;

showMenu = new Subject<boolean>()

  constructor(public afAuth: AngularFireAuth) { 

  	
 }

}
