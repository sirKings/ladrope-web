import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { AuthServiceService } from '../services/auth-service.service';
import { AlertService } from '../services/_services/index';


import { AngularFireDatabase } from 'angularfire2/database';


import { Observable } from 'rxjs/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

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



  constructor(public afAuth: AngularFireAuth, private alt: AlertService, public router: Router, public db: AngularFireDatabase, private auth: AuthServiceService) {
    this.user = afAuth.authState;
  }




  signin() {
    this.loading = true;
    //console.log(this.signinForm)

            if(this.signinForm.valid){
              this.afAuth.auth.signInWithEmailAndPassword(this.signinForm.value.email, this.signinForm.value.password)
              .catch((error) => {
                // Handle Errors here.
                let errorMessage = error.message;
                
                this.alt.error(errorMessage)
                this.loading = false;
            })
              .then((res) => {
                this.auth.uid = res.uid;
                this.user = this.getUser(res.uid);
                

              });
            }
            else{
              this.alt.error('Please enter valid details')
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
                    this.router.navigate(['/tailor', uid]);
                  })
              }else {
                this.router.navigate(['/shop']);
              }
              
          })
        this.loading = false;
  }

  ngOnDestroy(){
  }

}



  

  