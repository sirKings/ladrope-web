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
uid;

  constructor(public afAuth: AngularFireAuth, public router: Router, public db: AngularFireDatabase, public service: AuthServiceService, private route: ActivatedRoute) { }

  ngOnInit() {

      this.authObserver = this.afAuth.authState.subscribe( user => {
        if (user) {
          this.uid = user.uid;
            this.db.object('tailors/'+user.uid)
              .subscribe(res => {
                this.tailor = res;
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

  // onDelete(cloth){
  // 	this.db.object('/cloths/'+cloth.clothKey).set(null);
  // 	this.db.object('/tailors/'+this.tailor.uid+'/cloths/'+cloth.tailorKey).set(null);
  // }

  select(cloth){
  	this.selectedCloth = cloth;
  	this.router.navigate([cloth.name], { relativeTo: this.route })
  }

  edit(cloth){
    this.selectedCloth = cloth;
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  // deleteFileStorage(name:string) {
  	
  //   let storageRef = firebase.storage().ref();
  //   storageRef.child(`${name}`).delete()
  // }
  deactivate(cloth){
    //console.log('deactivate')
    this.db.object('/cloths/'+cloth.gender+'/'+cloth.clothKey).set(null);

    this.db.object('/tailors/'+this.uid+'/cloths/'+cloth.tailorKey).update({deactive: true});
  }

  activate(cloth){
    if(cloth.deactive){
     let clothKey = this.db.list('/cloths/'+cloth.gender).push(cloth).key;
     this.db.object('/tailors/'+this.uid+'/cloths/'+cloth.tailorKey).update({clothKey: clothKey, deactive: null});
     this.db.object('/cloths/'+cloth.gender+'/'+clothKey).update({clothKey: clothKey, deactive: null}); 
   }else{

   }
    
  }

}
