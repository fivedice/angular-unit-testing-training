import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderItem } from '../models/order-item.interface';
import { Donut } from '../models/donut.interface';
import { OrderQuantity } from '../models/order-quantity.enum';
import { OrderItemListComponent } from '../order-item-list/order-item-list.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuantityPipe } from '../common/quantity.pipe';

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

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private changeDetector: ChangeDetectorRef) { }

  public ngOnInit() {
    this.form = this.formBuilder.group({
      quantity: [OrderQuantity.Single]
    });
  }

  public addButtonClick() {
    if (this.selectedDonut) {
      const orderItem: OrderItem = {
        id: 0,
        type: this.selectedDonut,
        quantity: this.form.get('quantity').value
      };
      this.orderItemList.addOrderItem(orderItem);
    }
    this.changeDetector.markForCheck();
  }

  public removeButtonClick() {
    this.orderItemList.removeSelectedItems();
  }

  public orderButtonClick() {

  }

  public cancelClick() {
    this.router.navigate(['/']);
  }

  public onDonutSelected(donut: Donut) {
    this.selectedDonut = donut;
  }

  public hasSelectedDonut() {
    return typeof this.selectedDonut !== 'undefined';
  }

  public onOrderItemSelectionChange(items: OrderItem[]) {
    this.selectedOrderItems = items;
    this.changeDetector.markForCheck();
  }
}
