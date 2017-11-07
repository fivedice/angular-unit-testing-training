import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderItem } from '../models/order-item.interface';
import { Donut } from '../models/donut.interface';
import { OrderQuantity } from '../models/order-quantity.enum';
import { OrderItemListComponent } from '../order-item-list/order-item-list.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  orderItemList: OrderItemListComponent;

  OrderQuantity: any = OrderQuantity;
  form: FormGroup;
  selectedDonut: Donut;
  selectedOrderItems: OrderItem[] = [];
  orderItems: OrderItem[] = [];

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      quantity: [OrderQuantity.Single],
      name: ['', Validators.required]
    });
  }

  addButtonClick() {
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

  removeButtonClick() {
    this.orderItemList.removeSelectedItems();
  }

  submit() {
    const order: Order = {
      name: this.form.get('name').value,
      items: this.orderItems,
      status: OrderStatus.New
    };

    this.orderService.placeOrder(order);
    this.router.navigate(['/']);
  }

  cancelClick() {
    this.router.navigate(['/']);
  }

  onDonutSelected(donut: Donut) {
    this.selectedDonut = donut;
  }

  hasSelectedDonut() {
    return this.selectedDonut && typeof this.selectedDonut !== 'undefined';
  }

  isValid() {
    return this.form.valid && this.orderItems.length > 0;
  }

  onOrderItemSelectionChange(items: OrderItem[]) {
    this.selectedOrderItems = items;
    this.changeDetector.markForCheck();
  }

  onOrderItemsChange(items: OrderItem[]) {
    this.orderItems = items;
  }

  onDonutDoubleClick(item: Donut) {
    this.selectedDonut = item;
    this.addButtonClick();
  }
}
