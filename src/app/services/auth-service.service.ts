import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthServiceService {

authObserver;
tailor;
user;
selectedCloth;
selectedOrder;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) { 

  	this.authObserver = this.afAuth.authState.subscribe( user => {
      	if (user) {
        		this.user = user;
  				this.db.object('tailors/'+ this.user.uid)
        			.subscribe(res => {
        				this.tailor = res;
        				console.log(this.tailor)
        			})
                } 

           	});
  	}

  	getTailor(){
  		return this.tailor
  	}

}
