import { Component, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

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
  public selectionChange: EventEmitter<OrderItem[]> = new EventEmitter<OrderItem[]>();
  @Output()
  public itemsChange: EventEmitter<OrderItem[]> = new EventEmitter<OrderItem[]>();

  public orderItems: OrderItem[] = [];

  constructor(private changeDetector: ChangeDetectorRef) { }

  public getItemId(orderItem: OrderItem): number {
    return orderItem.id;
  }

  public getItemName(orderItem: OrderItem): string {
    return orderItem.type.name;
  }

  public getQuantity(orderItem: OrderItem): number {
    const pipe: QuantityPipe = new QuantityPipe();
    return pipe.transform(orderItem.quantity);
  }

  public selectionChanged(orderItems: OrderItem[]) {
    this.selectionChange.emit(orderItems);
  }

  public addOrderItem(item: OrderItem) {
    this.orderItems.push(item);
    this.itemsChange.emit(this.orderItems);
    this.changeDetector.markForCheck();
  }

  public removeSelectedItems(): any {
    this.orderItems = this.orderItems.filter(item => !item.selected);
    this.itemsChange.emit(this.orderItems);
    this.changeDetector.markForCheck();
  }

}
