import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-tailor',
  templateUrl: './tailor.component.html',
  styleUrls: ['./tailor.component.css']
})
export class TailorComponent implements OnInit {

tailor;
sub;
uid;
  constructor(public db: AngularFireDatabase, public route: ActivatedRoute) { }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
       this.uid = +params['res.uid']; // (+) converts string 'id' to a number

       // this.tailor = this.db.object('/tailors/'+ this.uid)
       // 		console.log(this.tailor)
    });
  }

}
