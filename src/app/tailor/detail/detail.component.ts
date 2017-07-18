import { Component, OnInit, OnDestroy } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy{
user;
authObserver;
tailor

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) { 
  		 
  }

  ngOnInit() {
  		this.authObserver = this.afAuth.authState.subscribe( user => {
      	if (user) {
        		this.user = user;
        		this.db.object('tailors/'+this.user.uid)
        			.subscribe(res => {
        				this.tailor = res;
        				console.log(this.tailor)
        			})
  				
                } 

           	});
  		
  }

  ngOnDestroy() {
  	this.authObserver.unsubscribe();
  }
}
