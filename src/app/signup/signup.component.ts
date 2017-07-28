import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { AuthServiceService } from '../services/auth-service.service';
import {AlertBar, AlertBarOptions, Placement, TextPlacement } from 'ng2-alert-bar';

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
user;
loading;
genders = ['male', 'female'];
public options: AlertBarOptions = new AlertBarOptions({
  placement: Placement.top,
  textPlacement: TextPlacement.left
});


  constructor(public db: AngularFireDatabase, private alert: AlertBar, public afAuth: AngularFireAuth, public router: Router, private auth: AuthServiceService) {
    this.user = afAuth.authState;
  }

  signup() {
    this.loading = true;
    //console.log(this.signupForm.value)
    if(this.signupForm.controls.isTailor.valid){
          if(this.signupForm.valid){
            if(this.signupForm.value.password === this.signupForm.value.password2){

              this.afAuth.auth.createUserWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password)
              .catch((error) => {
              // Handle Errors here.
              let errorMessage = error.message;
              
                this.alert.error('Error', errorMessage)
                this.loading = false;
            })
              .then((res) => {
                this.auth.uid = res.uid;
                if(this.signupForm.value.isTailor === 'true'){
                          this.db.object('/tailors/'+ res.uid)
                          .set({
                            name: this.signupForm.value.name,
                            address: this.signupForm.value.address,
                            phone: this.signupForm.value.phone,
                            email: this.signupForm.value.email,
                            displayName: this.signupForm.value.displayName,
                            uid: res.uid
                          })
                          console.log (res)
                          this.router.navigate(['/tailor', res.uid]);
                  } else {
                            this.db.object('/users/'+ res.uid)
                            .set({
                              email: this.signupForm.value.email,
                              gender: this.signupForm.value.gender,
                              displayName: this.signupForm.value.displayName
                            })
                            console.log (res)
                            this.router.navigate(['/shop']);
                        }
                this.loading = false;
                this.user = this.getUser(res.uid);
              });
            }  else {
            this.passwordMatch = false;
            this.loading = false;
            } 
        }
          else{
            this.alert.error('Error', 'Please enter Valid Details')
            this.loading = false;
          }
        }else{
          this.alert.error('Error', 'Please select no if you not a tailor')
          this.loading = false;
        }
  	
    
  }

  ngOnInit() {
  	this.signupForm = new FormGroup({
      'displayName': new FormControl(null, Validators.required),
      'isTailor': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.compose([Validators.minLength(6), Validators.required])]),
      'password2': new FormControl(null, [Validators.required]),
      'agree': new FormControl(null, Validators.required),
      'name': new FormControl(null),
      'address': new FormControl(null),
      'gender': new FormControl(null),
      'phone': new FormControl(null)
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
    this.auth.user = this.user;
    console.log(this.user)
  }

}
