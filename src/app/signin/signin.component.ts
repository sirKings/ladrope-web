import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { AuthServiceService } from '../services/auth-service.service';


import { AngularFireDatabase } from 'angularfire2/database';


import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

user
signinForm;
isTailor = true;
loading = false;

@ViewChild('alert') alert:ElementRef;

  constructor(public afAuth: AngularFireAuth, public router: Router, public db: AngularFireDatabase, private auth: AuthServiceService) {
    this.user = afAuth.authState;
  }




  signin() {
    this.loading = true;
    console.log(this.signinForm.value)

  	if(this.signinForm.valid){
  		this.afAuth.auth.signInWithEmailAndPassword(this.signinForm.value.email, this.signinForm.value.password)
  		.catch((error) => {
  			// Handle Errors here.
  			let errorMessage = error.message;
  			
  			this.alert.nativeElement.style.display = 'block';
    		this.alert.nativeElement.innerHTML = errorMessage;
  			
  			console.log(error);
        this.loading = false;
		})
  		.then((res) => {
        this.loading = false;
        this.user = this.getUser(res.uid);
        this.auth.uid = res.uid;
        if(this.signinForm.value.isTailor === 'true'){
          console.log (res)
          this.router.navigate(['/tailor', res.uid]);
        }else{
          console.log (res)
          this.router.navigate(['/shop']);
        }
  			

  		});
  	}
  	else{
  		this.alert.nativeElement.style.display = 'block';
  		this.alert.nativeElement.innerHTML = 'Please enter signin details';
      this.loading = false
  	}
    
  }

  // logout() {
  //   this.afAuth.auth.signOut();
  // }

  ngOnInit() {
  	this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'isTailor': new FormControl(null, Validators.required)
      });
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

  ngOnDestroy(){
  }

}



  

  