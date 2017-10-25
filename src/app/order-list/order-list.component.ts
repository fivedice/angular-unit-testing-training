import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { OrderListService } from './order-list.service';
import { Order } from '../models/order.interface';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent implements OnInit, OnDestroy {

  @Output()
  public selectionChange: EventEmitter<Order[]> = new EventEmitter<Order[]>();

  public orders: Order[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private orderListService: OrderListService,
              private changeDetector: ChangeDetectorRef) { }

  public ngOnInit() {
    this.subscriptions.push(
      this.orderListService.ordersChanged$.subscribe((orders: Order[]) => {
        this.orders = orders;
        this.changeDetector.markForCheck();
      }));

    this.orderListService.getPendingOrders();
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) {
        sub.unsubscribe();
      }
    });
  }

  public toggleSelection(event: MouseEvent, order: Order) {
    order.selected = !order.selected;
    this.selectionChange.emit(this.orders.filter((o: Order) => o.selected));
  }
}
