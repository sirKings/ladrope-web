import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
isError = false;

@ViewChild('alert') alert:ElementRef;
@ViewChild('alert1') alert1:ElementRef;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.user = afAuth.authState;
  }




  signin() {
  	this.alert.nativeElement.style.display = 'none';
  	this.alert1.nativeElement.style.display = 'none';

  	if(this.signinForm.valid){
  		this.afAuth.auth.sendPasswordResetEmail(this.signinForm.value.email)
  		.catch((error) => {
  			// Handle Errors here.
  			let errorMessage = error.message;
  			this.isError = true;
  			this.alert.nativeElement.style.display = 'block';
    		this.alert.nativeElement.innerHTML = errorMessage;
  			
  			console.log(error);
		})
  		.then((res) => {
  			console.log (res) 
  			if(!this.isError){
  				this.alert1.nativeElement.style.display = 'block';
  				this.alert1.nativeElement.innerHTML = 'A reset password mail has been sent to your email, please follow the link to reset your password'

  			}
  			
  		});
  	}
  	else{
  		this.alert.nativeElement.style.display = 'block';
  		this.alert.nativeElement.innerHTML = 'Please enter signin details'
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
