import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent {
  orderId;

  constructor(private route: ActivatedRoute) {
    this.orderId = this.route.snapshot.paramMap.get('id');
  }

}
