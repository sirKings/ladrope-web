import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {

	user;
	authObserver;
  contactForm;
	
	constructor(public afAuth: AngularFireAuth, public router: Router){
		this.authObserver = afAuth.authState.subscribe( user => {
      	if (user) {
        		this.user = user;
                } else {
                	this.user = null
                }

           	});
        //authObserver.unsubscribe();
	}

  ngOnInit() {
      this.contactForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'name': new FormControl(null, [Validators.required]),
        'phone': new FormControl(null, Validators.required),
        'content': new FormControl(null, Validators.required)
        });
  }

  goToShop(){
    if(this.user){
      this.router.navigate(['shop'])
    } else {
      this.router.navigate(['signin'])
    }
  }

  ngOnDestroy(){
  	this.authObserver.unsubscribe();
  }

  contact(){
    if(this.contactForm.valid){
      //this.db.list('/mails').push(this.contactForm.value)
      this.contactForm.reset();
    }
  }

}
