import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthServiceService {

user;
uid;
selectedCloth;
selectedOrder;
gender;

showMenu = new Subject<boolean>()
nav = new Subject()

  constructor(public afAuth: AngularFireAuth) { 

  	
 }

}
