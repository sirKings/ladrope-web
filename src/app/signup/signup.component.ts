import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
signupForm;
passwordMatch = true;
user: Observable<firebase.User>;

@ViewChild('alert') alert:ElementRef;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, public router: Router) {
    this.user = afAuth.authState;
  }

  signup() {
  	if(this.signupForm.valid){
  		if(this.signupForm.value.password === this.signupForm.value.password2){

  			this.afAuth.auth.createUserWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password)
	  		.catch((error) => {
  			// Handle Errors here.
  			let errorMessage = error.message;
  			
  				this.alert.nativeElement.style.display = 'block';
    			this.alert.nativeElement.innerHTML = errorMessage;
  			
  				console.log(error);
			})
  			.then((res) => {
  				this.db.object('/tailors/'+ res.uid)
  				.set({
  					name: this.signupForm.value.name,
  					address: this.signupForm.value.address,
  					phone: this.signupForm.value.phone,
  					email: this.signupForm.value.email,
            uid: res.uid
  				})
  				console.log (res)
  				this.router.navigate(['/tailor', res.uid]);
  			});
  		}  else {
    	this.passwordMatch = false;
    	} 
	}
  	else{
  		this.alert.nativeElement.style.display = 'block';
  		this.alert.nativeElement.innerHTML = 'Please enter valid details'
  	}
    
  }

  ngOnInit() {
  	this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.compose([Validators.minLength(6), Validators.required])]),
      'password2': new FormControl(null, [Validators.required]),
      'name': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, Validators.required)
      });
  }

}
