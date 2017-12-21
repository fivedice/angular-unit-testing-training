import { Component, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef, Input } from '@angular/core';

import { OrderItem } from '../models/order-item.interface';
import { QuantityPipe } from '../common/quantity.pipe';

@Component({
  selector: 'app-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemListComponent {

  @Output()
  selectionChange: EventEmitter<OrderItem[]> = new EventEmitter<OrderItem[]>();
  @Output()
  itemsChange: EventEmitter<OrderItem[]> = new EventEmitter<OrderItem[]>();

  @Input()
  orderItems: OrderItem[] = [];

  constructor(private changeDetector: ChangeDetectorRef) { }

  getItemId(orderItem: OrderItem): number {
    return orderItem.id;
  }

  getItemName(orderItem: OrderItem): string {
    return orderItem.type.name;
  }

  getQuantity(orderItem: OrderItem): number {
    const pipe: QuantityPipe = new QuantityPipe();
    return pipe.transform(orderItem.quantity);
  }

  selectionChanged(orderItems: OrderItem[]) {
    this.selectionChange.emit(orderItems);
  }

  addOrderItem(item: OrderItem) {
    this.orderItems.push(item);
    this.itemsChange.emit(this.orderItems);
    this.changeDetector.markForCheck();
  }

  removeSelectedItems(): any {
    this.orderItems = this.orderItems.filter(item => !item.selected);
    this.itemsChange.emit(this.orderItems);
    this.changeDetector.markForCheck();
  }

}
