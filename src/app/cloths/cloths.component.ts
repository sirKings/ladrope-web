import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-cloths',
  templateUrl: './cloths.component.html',
  styleUrls: ['./cloths.component.css']
})
export class ClothsComponent implements OnInit {

key;
cloth;
uid;
user;

  constructor(private route: ActivatedRoute, private afAuth: AngularFireAuth, private db: AngularFireDatabase) { 
  		this.route.params.subscribe((key)=>{
  			this.key = key;
  			this.key = this.key.key;
  			let sub = this.db.object('/cloths/male/'+ this.key)
  			          .subscribe(snapshot => {
  			              this.cloth = snapshot;
  			              if(this.cloth.$value === null){
  			                sub.unsubscribe();
  			                let sub1 = this.db.object('/cloths/female/'+this.key)
  			                  .subscribe(snapshot => {
  			                    this.cloth = snapshot;
  			                  })
  			              }
  			         })
  		})
  		const authObserver = this.afAuth.authState.subscribe((user) => {
  			if(user){
  				this.uid = user.uid;
  				let sub = this.db.object('/users/'+this.uid)
  				  .subscribe(snapshot => {
  				      this.user = snapshot;
  				      if(this.user.$value === null){
  				        sub.unsubscribe();
  				        let sub1 = this.db.object('/tailors/'+this.uid)
  				          .subscribe(snapshot => {
  				            this.user = snapshot;
  				          })
  				       }
  				  })
  			}
  			authObserver.unsubscribe();
  		})
  }

  ngOnInit() {


  }

  like () {
      console.log(this.cloth.likers)
      let num = this.cloth.likes
      if(this.cloth.likers[this.uid] === true){
        num--;
        this.db.object('/cloths/'+this.cloth.gender+ '/'+this.cloth.$key).update({likes: num});
        this.cloth.likers[this.uid] = null;
      } else {
       num++ 
      this.db.object('/cloths/'+this.cloth.gender+ '/'+this.cloth.$key).update({likes: num});
       this.cloth.likers[this.uid] = true;
      }
     this.db.object('/cloths/'+this.cloth.gender+ '/'+this.cloth.$key).update({likers: this.cloth.likers})
  }

}
