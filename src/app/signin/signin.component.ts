import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

user: Observable<firebase.User>;
signinForm;

@ViewChild('alert') alert:ElementRef;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.user = afAuth.authState;
  }




  signin() {
  	if(this.signinForm.valid){
  		this.afAuth.auth.signInWithEmailAndPassword(this.signinForm.value.email, this.signinForm.value.password)
  		.catch((error) => {
  			// Handle Errors here.
  			let errorMessage = error.message;
  			
  			this.alert.nativeElement.style.display = 'block';
    		this.alert.nativeElement.innerHTML = errorMessage;
  			
  			console.log(error);
		})
  		.then((res) => {
  			console.log (res)
  			this.router.navigate(['/tailor', res.uid]);

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
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      });
  }

}



  

  