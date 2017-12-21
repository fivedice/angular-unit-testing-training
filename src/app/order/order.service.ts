import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Order } from '../models/order.interface';
import { OrderStatus } from '../models/order-status.enum';
import { OrderQuantity } from '../models/order-quantity.enum';

@Injectable()
export class OrderService {

  ordersChanged$: Subject<Order[]> = new Subject<Order[]>();

  private orders: Order[] = [];

  private maxOrderId = 0;

  constructor() {
    this.setDefaultOrders();
  }

  /**
   * Fires a fake async request to get all orders that have not been picked up.
   * @memberof OrderService
   */
  getPendingOrders() {
    this.next();
  }

  getOrder(id: number): Order {
    return this.orders.find((order: Order) => order.id === id);
  }

  /**
   * Fires a fake async request to place a new order.
   * @param {Order} order
   * @memberof OrderService
   */
  placeOrder(order: Order) {
    order.id = this.maxOrderId;
    this.maxOrderId += 1;
    order.status = OrderStatus.New;
    this.orders.push(order);
    this.next();
  }

  /**
   * Fires a fake async request to change the status of an order.
   * @param {Order} order
   * @param {OrderStatus} status
   * @memberof OrderService
   */
  changeOrderStatus(order: Order, status: OrderStatus) {
    this.orders.find((o: Order) => {
      if (JSON.stringify(o) === JSON.stringify(order)) {
        o.status = status;
        return true;
      }
    });
    this.next();
  }

  clearSelections() {
    this.orders.forEach((order: Order) => {
      order.selected = false;
    });
    this.next();
  }

  /**
   * Updates the observable stream on non-pending orders with the latest data.
   * @private
   * @memberof OrderService
   */
  private next() {
    // If this were an http get/post/etc, it would be asynchronous, so fake that...
    setTimeout(() => {
      const pending = this.orders.filter(order => order.status !== OrderStatus.PickedUp);
      this.ordersChanged$.next(pending);
    }, 100);
  }

  private setDefaultOrders() {
    this.orders = [{
      'name': 'Default 1',
      'items': [{
        'id': 0,
        'type': {
          'id': 6,
          'name':
          'Cake Blueberry Donut',
          'selected': true
        },
        'quantity': 0
      }],
      'status': 0,
      'id': 0,
      'selected': false
    }, {
      'name':
      'Default 2',
      'items': [{
        'id': 0,
        'type': {
          'id': 0,
          'name':
          'Raised Maple Donut',
          'selected': true
        },
        'quantity': 1
      }],
      'status': 0,
      'id': 1,
      'selected': false
    }, {
      'name': 'Default 3',
      'items': [{
        'id': 0,
        'type': {
          'id': 6,
          'name': 'Cake Blueberry Donut',
          'selected': false
        },
        'quantity': 0
      }, {
        'id': 0,
        'type': {
          'id': 0,
          'name': 'Raised Maple Donut',
          'selected': false
        },
        'quantity': 1
      }, {
        'id': 0,
        'type': {
          'id': 2,
          'name': 'Raised Chocolate Donut',
          'selected': false
        },
        'quantity': 2
      }, {
        'id': 0,
        'type': {
          'id': 3,
          'name': 'Raised Strawberry Donut',
          'selected': true
        },
        'quantity': 3
      }],
      'status': 0,
      'id': 2,
      'selected': false
    }, {
      'name': 'Favorites',
      'items': [{
        'id': 0,
        'type': {
          'id': 71,
          'name': 'Maple Long John',
          'selected': true
        }, 'quantity': 3
      }],
      'status': 0,
      'id': 3
    }];
  }
}
