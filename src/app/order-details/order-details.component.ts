import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order/order.service';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../models/order.interface';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private orderService: OrderService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  onSelectionChanged(orders: Order[]) {
    if (orders.length > 0) {
      this.router.navigate(['orderdetails', orders[0].id]);
    } else {
      this.router.navigate(['orderdetails']);
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
