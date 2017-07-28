import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
import {AlertBar, AlertBarOptions, Placement, TextPlacement } from 'ng2-alert-bar';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthServiceService } from '../services/auth-service.service';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {

	user;
  nav;
	authObserver;
  contactForm;
  imageSources: string[];
  config: ICarouselConfig;
  public options: AlertBarOptions = new AlertBarOptions({
    placement: Placement.top,
    textPlacement: TextPlacement.left
  });

	
	constructor(public afAuth: AngularFireAuth, private auth: AuthServiceService, public router: Router, private alert: AlertBar, private db: AngularFireDatabase){
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
      this.nav = this.auth.nav.subscribe((res) => {
        console.log(res)
        let el = document.getElementById('contact')
        el.scrollIntoView(true)

      })
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
    this.nav.unsubscribe()
  }

  contact(){
    if(this.contactForm.valid){
      console.log(this.contactForm.value)
      this.db.list('/messages').push(this.contactForm.value)
      this.alert.success('Ladrope got you', 'and we will responf soon')
      this.contactForm.reset();

    }else{
      this.alert.success('Error', 'Please fill all entries')
    }
  }

}
