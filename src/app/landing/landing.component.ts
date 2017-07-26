import { Component, OnInit, OnDestroy } from '@angular/core';

import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';

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
  imageSources: string[];
  config: ICarouselConfig;
	
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

        this.imageSources = [
           'assets/images/shop/shop1.jpg',
           'assets/images/shop/shop2.jpg',
           'assets/images/shop/shop3.jpg',
           'assets/images/shop/shop4.jpg',
        ];

       this.config = {
        verifyBeforeLoad: true,
        log: false,
        animation: true,
        animationType: AnimationConfig.SLIDE,
        autoplay: true,
        autoplayDelay: 3000,
        stopAutoplayMinWidth: 768
      };
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
