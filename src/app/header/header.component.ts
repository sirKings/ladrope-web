import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showMenu = false;
  ismenu = false;
	user;
	constructor(public afAuth: AngularFireAuth, public router: Router, private auth: AuthServiceService){
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

  goToShop(){
    if(this.user){
      this.router.navigate(['shop'])
    } else {
      this.router.navigate(['signin'])
    }
  }

  toggleCollapse(){
    this.showMenu = !this.showMenu;
  }

  menu(){
    this.ismenu = !this.ismenu;
    let status = this.ismenu;
    this.auth.showMenu.next(status)
  }

}
