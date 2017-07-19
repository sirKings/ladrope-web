import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthServiceService } from '../../services/auth-service.service';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
canceled = false;
pending = true;
completed = false;
authObserver;
tailor;
selectedOrder;
pendingOrders = [];
completedOrders = [];
canceledOrders = [];
isPendingOrder = false;
isCanceledOrder = false;
isCompletedOrder = false;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public router: Router, private service: AuthServiceService, private route: ActivatedRoute) { }

  

  pend(){
  	this.canceled = false;
  	this.completed = false;
  	this.pending = true;
  }

  complete(){
  	this.canceled = false;
  	this.completed = true;
  	this.pending = false;
  }

  cancel(){
  	this.canceled = true;
  	this.completed = false;
  	this.pending = false;
  }

  ngOnInit() {

      this.authObserver = this.afAuth.authState.subscribe( user => {
        if (user) {
            this.db.object('tailors/'+user.uid)
              .subscribe(res => {
                this.tailor = res;
                 if(this.tailor.orders){
                  this.pendingOrders = this.getCloths(this.tailor.orders)
                  this.isPendingOrder = true;
                  console.log(this.pendingOrders);
                  console.log(this.tailor)
                  }
                 if(this.tailor.completedOrders){
                  this.completedOrders = this.getCloths(this.tailor.completedOrders)
                  this.isCompletedOrder = true;
                 }
                 if (this.tailor.canceledOrders) {
                   this.canceledOrders = this.getCloths(this.tailor.canceledOrders)
                   this.isCanceledOrder = true;
                 }
              })
          
                } 

             });
  }   

  ngOnDestroy() {
    this.authObserver.unsubscribe();
    this.service.selectedOrder = this.selectedOrder;
  }

  getCloths(obj){
      let result = Object.keys(obj).map(function(e) {
       return obj[e]
      });
      return result;
  }

  select(cloth){
    this.selectedOrder = cloth;
    console.log(this.selectedOrder)
    this.router.navigate([cloth.name], { relativeTo: this.route })
  }

}
