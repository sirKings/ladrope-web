import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showMenu = false;
  ismenu = false;
	user;
  uid
	constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, public router: Router, private auth: AuthServiceService){
		const authObserver = afAuth.authState.subscribe( user => {
      	if (user) {
        		this.uid = user.uid;
            this.getUser(this.uid)
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

  scroll() {
      let el 
      this.router.navigate(['/'])
        .then(() => {
          this.auth.nav.next(el)
        })
  }

  getUser(uid){
        let sub = this.db.object('/users/'+uid)
          .subscribe(snapshot => {
              this.user = snapshot;
              console.log(this.user.$value)
              this.auth.user = this.user;
              if(this.user.$value === null){
                sub.unsubscribe();
                let sub1 = this.db.object('/tailors/'+uid)
                  .subscribe(snapshot => {
                    this.user = snapshot;
                    console.log(this.user)
                    this.auth.user = this.user;
                  })
              } 
              
          })
  }

}
