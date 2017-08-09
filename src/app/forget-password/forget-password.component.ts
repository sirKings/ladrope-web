import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../services/_services/index';

import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

user: Observable<firebase.User>;
signinForm;
loading = false;

  constructor(public afAuth: AngularFireAuth, private alert: AlertService, public router: Router) {
    this.user = afAuth.authState;
  }




  signin() {

  	if(this.signinForm.valid){
      this.loading = true;
  		this.afAuth.auth.sendPasswordResetEmail(this.signinForm.value.email)
  		.catch((error) => {
  			// Handle Errors here.
  			let errorMessage = error.message;
  			this.alert.error(errorMessage)
  			
		})
  		.then((res) => {
        this.loading = false;
  				this.alert.success('A reset password link has been sent to your email, please follow the link to reset your password')
  			
  		});
  	}
  	else{
  		this.alert.error('Please enter signin details')
  	}
    
  }

  // logout() {
  //   this.afAuth.auth.signOut();
  // }

  ngOnInit() {
  	this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
      });
  }

}
