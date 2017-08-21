import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { AuthServiceService } from '../services/auth-service.service';

import { AlertService } from '../services/_services/index';

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
phone;
genders = ['male', 'female'];



  constructor(public db: AngularFireDatabase, private alert: AlertService, public afAuth: AngularFireAuth, public router: Router, private auth: AuthServiceService) {
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
              
                this.alert.error('Error')
                this.loading = false;
            })
              .then((res) => {
                this.auth.uid = res.uid;
                if(this.signupForm.value.isTailor === '1'){
                          this.db.object('/tailors/'+ res.uid)
                          .set({
                            name: this.signupForm.value.name,
                            address: this.signupForm.value.address,
                            phone: this.phone,
                            email: this.signupForm.value.email,
                            displayName: this.signupForm.value.displayName,
                            uid: res.uid
                          })
                          this.router.navigate(['/tailor', res.uid]);
                  } else {
                            this.db.object('/users/'+ res.uid)
                            .set({
                              email: this.signupForm.value.email,
                              gender: this.signupForm.value.gender,
                              displayName: this.signupForm.value.displayName
                            })
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
            this.alert.error('Please enter Valid Details')
            this.loading = false;
          }
        }else{
          this.alert.error('Please select NO if you not a tailor')
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
      'phone': new FormControl(null, Validators.compose([Validators.minLength(11)]))
      });
  }

  getUser(uid){
        let sub = this.db.object('/users/'+uid)
          .subscribe(snapshot => {
              this.user = snapshot;
              this.auth.user = this.user;
              if(this.user.$value === null){
                sub.unsubscribe();
                let sub1 = this.db.object('/tailors/'+uid)
                  .subscribe(snapshot => {
                    this.user = snapshot;
                    this.auth.user = this.user;
                  })
              } 
              
          })
  }

  ngOnDestroy(){
    this.auth.user = this.user;
  }

  checkNumber(str: string){
    if((str.length === 11)&& (str.slice(0,1)==='0')){
      let num = str.slice(1)
      num = '+234'+num;
      this.phone = num;
      return true
    }else{
      if ((str.length === 14) && (str.slice(0,1)==='+')){
        this.phone = str
        return true;
      }else{
        return false;
      }
    }
  }

}
