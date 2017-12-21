import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { OrderItem } from '../models/order-item.interface';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../order/order.service';
import { Order } from '../models/order.interface';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  order: Order;

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        if (params.id >= 0) {
          this.order = this.orderService.getOrder(+params.id);
          this.changeDetector.markForCheck();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) {
        sub.unsubscribe();
      }
    });
  }

}
