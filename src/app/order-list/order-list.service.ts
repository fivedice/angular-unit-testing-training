import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Order } from '../models/order.interface';
import { OrderStatus } from '../models/order-status.enum';
import { OrderQuantity } from '../models/order-quantity.enum';

@Injectable()
export class OrderListService {

  public ordersChanged$: Subject<Order[]> = new Subject<Order[]>();

  private orders: Order[] = [];

  constructor() {}

  /**
   * Fires a fake async request to get all orders that have not been picked up.
   * @memberof OrderListService
   */
  public getPendingOrders() {
    this.next();
  }

  /**
   * Fires a fake async request to place a new order.
   * @param {Order} order
   * @memberof OrderListService
   */
  public placeOrder(order: Order) {
    order.status = OrderStatus.New;
    this.orders.push(order);
    this.next();
  }

  /**
   * Fires a fake async request to change the status of an order.
   * @param {Order} order
   * @param {OrderStatus} status
   * @memberof OrderListService
   */
  public changeOrderStatus(order: Order, status: OrderStatus) {
    this.orders.find((o: Order) => {
      if (JSON.stringify(o) === JSON.stringify(order)) {
        o.status = status;
        return true;
      }
    });
    this.next();
  }

  public clearSelections() {
    this.orders.forEach((order: Order) => {
      order.selected = false;
    });
    this.next();
  }

  /**
   * Updates the observable stream on non-pending orders with the latest data.
   * @private
   * @memberof OrderListService
   */
  private next() {
    // If this were an http get/post/etc, it would be asynchronous, so fake that...
    setTimeout(() => {
      const pending = this.orders.filter(order => order.status !== OrderStatus.PickedUp);
      this.ordersChanged$.next(pending);
    }, 100);
  }
}
