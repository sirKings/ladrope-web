import { Component, OnInit, OnDestroy } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy{

authObserver;
tailor;
loading;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) { 
  		 
  }

  ngOnInit() {
      this.loading = true;
  		this.authObserver = this.afAuth.authState.subscribe( user => {
      	if (user) {
        		this.db.object('tailors/'+ user.uid)
        			.subscribe(res => {
        				this.tailor = res;
                this.loading = false;
        				console.log(this.tailor)
        			})
  				
                } 

           	});
  		
  }

  getImg(){
    if(this.tailor.logo){
      return this.tailor.logo
    }else {
      return 'assets/images/upload_placeholder2.png'
    }
  }

  ngOnDestroy() {
  	this.authObserver.unsubscribe();
    
  }
}
