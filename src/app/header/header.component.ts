import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

	user;
	constructor(public afAuth: AngularFireAuth, public router: Router){
		const authObserver = afAuth.authState.subscribe( user => {
      	if (user) {
        		this.user = user;
                } else {
                	this.user = null
                }

           	});
        //authObserver.unsubscribe();
	}

	signout(){
		this.afAuth.auth.signOut();
	}

  goToTailor(){
    if(this.user){
      this.router.navigate(['tailor', this.user.uid])
    } else {
      this.router.navigate(['signin'])
    }
  }
}
