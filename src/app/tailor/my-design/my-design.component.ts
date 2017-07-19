import { Component, OnInit } from '@angular/core';

import { AuthServiceService } from '../../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-my-design',
  templateUrl: './my-design.component.html',
  styleUrls: ['./my-design.component.css']
})
export class MyDesignComponent implements OnInit {
authObserver;
tailor;
cloths;
isCloth = false;
selectedCloth;

  constructor(public afAuth: AngularFireAuth, public router: Router, public db: AngularFireDatabase, public service: AuthServiceService, private route: ActivatedRoute) { }

  ngOnInit() {

      this.authObserver = this.afAuth.authState.subscribe( user => {
        if (user) {
            this.db.object('tailors/'+user.uid)
              .subscribe(res => {
                this.tailor = res;
                console.log(this.tailor)
                if(this.tailor.cloths){
                	this.cloths = this.getCloths(this.tailor.cloths)
                	this.isCloth = true
                }
                
              })
          
        } 

      });

  }   

  ngOnDestroy() {
    this.authObserver.unsubscribe();
    this.service.selectedCloth = this.selectedCloth
  }

  getCloths(obj){
      let result = Object.keys(obj).map(function(e) {
       return obj[e]
      });
      return result;
  }

  onDelete(cloth){
  	this.db.object('/cloths/'+cloth.clothKey).set(null);
  	this.db.object('/tailors/'+this.tailor.uid+'/cloths/'+cloth.tailorKey).set(null);
  }

  select(cloth){
  	this.selectedCloth = cloth;
  	this.router.navigate([cloth.name], { relativeTo: this.route })
  }

  // deleteFileStorage(name:string) {
  	
  //   let storageRef = firebase.storage().ref();
  //   storageRef.child(`${name}`).delete()
  // }


}
