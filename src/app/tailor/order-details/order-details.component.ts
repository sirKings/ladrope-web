import { Component, OnInit } from '@angular/core';

import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
order;
  constructor(private service: AuthServiceService) { }

  ngOnInit() {
  	this.order = this.service.selectedOrder;
  	console.log(this.order)
  }

}
