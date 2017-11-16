import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemListComponent } from './order-item-list.component';
import { OrderItem } from '../models/order-item.interface';
import { OrderQuantity } from '../models/order-quantity.enum';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('OrderItemListComponent', () => {
  let component: OrderItemListComponent;
  let fixture: ComponentFixture<OrderItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderItemListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits selection change', () => {
    const items: OrderItem[] = [{
      id: 0,
      type: {
        id: 0,
        name: 'unittest'
      },
      quantity: OrderQuantity.Single
    }];
    component.selectionChange.subscribe((orderItems: OrderItem[]) => {
      expect(orderItems).toEqual(items);
    });
    component.selectionChanged(items);
  });
});
