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
        			})
  				
                } 

           	});
  		
  }

  getImg(){
    if(this.tailor){
      if(this.tailor.logo){
        return this.tailor.logo
      }else {
        return 'https://firebasestorage.googleapis.com/v0/b/ladrope-9e888.appspot.com/o/assets%2Fupload_placeholder2.png?alt=media&token=1e857115-e1da-4954-ad01-21f6512afb6a'
      }
    }
    
  }

  ngOnDestroy() {
  	this.authObserver.unsubscribe();
    
  }
}
