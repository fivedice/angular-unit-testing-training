import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { OrderService } from '../order/order.service';
import { Order } from '../models/order.interface';
import { QuantityPipe } from '../common/quantity.pipe';
import { OrderItem } from '../models/order-item.interface';
import { OrderStatus } from '../models/order-status.enum';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent implements OnInit, OnDestroy {

  @Output()
  selectionChange: EventEmitter<Order[]> = new EventEmitter<Order[]>();

  orders: Order[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private orderListService: OrderService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscriptions.push(
      this.orderListService.ordersChanged$.subscribe((orders: Order[]) => {
        this.orders = orders;
        this.changeDetector.markForCheck();
      }));

    this.orderListService.getPendingOrders();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) {
        sub.unsubscribe();
      }
    });
    this.orderListService.clearSelections();
  }

  getItemId(order: Order): number {
    return order.id;
  }

  getItemName(order: Order): string {
    return order.name;
  }

  getQuantity(order: Order): number {
    const pipe: QuantityPipe = new QuantityPipe();
    let qty = 0;
    order.items.forEach((item: OrderItem) => {
      qty += pipe.transform(item.quantity);
    });
    return qty;
  }

  getStatusIcon(order: Order): string {
    switch (order.status) {
      case OrderStatus.New:
        return '*';
      case OrderStatus.Ready:
        return '&#x2713;';
      default:
        return '&nbsp;';
    }
  }

  selectionChanged(orders: Order[]) {
    this.selectionChange.emit(orders);
  }

  toggleSelection(event: MouseEvent, order: Order) {
    order.selected = !order.selected;
    this.selectionChange.emit(this.orders.filter((o: Order) => o.selected));
  }
}
