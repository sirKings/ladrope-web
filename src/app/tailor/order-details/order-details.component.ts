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
unit;
options;
isOption = false;
  constructor(private service: AuthServiceService, private router: Location) { }

  ngOnInit() {
  	this.order = this.service.selectedOrder;
    this.unit = this.order.size.unit;
    if(this.order.options === 'No options'){
      this.isOption = false;
    }else{
      this.isOption = true;
      this.options = this.order.options
      console.log(this.options)
    }
    
  }

   back(){
    this.router.back();
  }

}
