import { Component, OnInit } from '@angular/core';

import { AuthServiceService } from '../../services/auth-service.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
order;
  constructor(private service: AuthServiceService, private router: Location) { }

  ngOnInit() {
  	this.order = this.service.selectedOrder;
  	console.log(this.order)
  }

   back(){
    this.router.back();
  }

}
