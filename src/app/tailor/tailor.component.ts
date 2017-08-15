import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthServiceService } from '../services/auth-service.service';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-tailor',
  templateUrl: './tailor.component.html',
  styleUrls: ['./tailor.component.css']
})
export class TailorComponent implements OnInit, OnDestroy {

tailor;
sub;
uid;
menu;
isMenu = true;

  constructor(public db: AngularFireDatabase, public route: ActivatedRoute, private auth: AuthServiceService) { }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
       this.uid = +params['res.uid']; // (+) converts string 'id' to a number
    });

    this.menu = this.auth.showMenu.subscribe((res)=>{
    	this.isMenu = res;
    })
  }

  ngOnDestroy(){
  	this.menu.unsubscribe()
  	this.sub.unsubscribe()
  }

}
