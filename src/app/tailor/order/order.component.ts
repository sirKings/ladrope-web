import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
canceled = false;
pending = true;
completed = false;

  constructor() { }

  ngOnInit() {
  }

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

}
