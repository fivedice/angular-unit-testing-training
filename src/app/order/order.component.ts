import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderItem } from '../models/order-item.interface';
import { Donut } from '../models/donut.interface';
import { OrderQuantity } from '../models/order-quantity.enum';
import { OrderItemListComponent } from '../order-item-list/order-item-list.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuantityPipe } from '../common/quantity.pipe';
import { OrderService } from './order.service';
import { Order } from '../models/order.interface';
import { OrderStatus } from '../models/order-status.enum';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent implements OnInit {

  @ViewChild(OrderItemListComponent)
  public orderItemList: OrderItemListComponent;

  public OrderQuantity: any = OrderQuantity;
  public form: FormGroup;
  public selectedDonut: Donut;
  public selectedOrderItems: OrderItem[] = [];
  public orderItems: OrderItem[] = [];

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder,
              private changeDetector: ChangeDetectorRef) { }

  public ngOnInit() {
    this.form = this.formBuilder.group({
      quantity: [OrderQuantity.Single],
      name: ''
    });
  }

  public addButtonClick() {
    if (this.selectedDonut) {
      const orderItem: OrderItem = {
        id: 0,
        type: this.selectedDonut,
        quantity: parseInt(this.form.get('quantity').value, 10)
      };
      this.orderItemList.addOrderItem(orderItem);
    }
    this.changeDetector.markForCheck();
  }

  public removeButtonClick() {
    this.orderItemList.removeSelectedItems();
  }

  public orderButtonClick() {
    const order: Order = {
      name: this.form.get('name').value,
      items: this.orderItems,
      status: OrderStatus.New
    };

    this.orderService.placeOrder(order);
    this.router.navigate(['/']);
  }

  public cancelClick() {
    this.router.navigate(['/']);
  }

  public onDonutSelected(donut: Donut) {
    this.selectedDonut = donut;
  }

  public hasSelectedDonut() {
    return this.selectedDonut && typeof this.selectedDonut !== 'undefined';
  }

  public isValid() {
    return this.form.get('name').value.length > 0 && this.orderItems.length > 0;
  }

  public onOrderItemSelectionChange(items: OrderItem[]) {
    this.selectedOrderItems = items;
    this.changeDetector.markForCheck();
  }

  public onOrderItemsChange(items: OrderItem[]) {
    this.orderItems = items;
  }
}
