import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { Router } from '@angular/router';
import { OrderService } from './order.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrderQuantity } from '../models/order-quantity.enum';
import { OrderItem } from '../models/order-item.interface';
import { OrderStatus } from '../models/order-status.enum';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let service: OrderService;
  let routerStub: RouterStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderComponent],
      providers: [
        FormBuilder,
        OrderService,
        { provide: Router, useClass: RouterStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(OrderService);
    routerStub = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // defaults
  it('has defaults', () => {
    expect(component.form.value).toEqual({
      name: '',
      quantity: OrderQuantity.Single
    });
  });

  // is not valid by default
  it('is not valid by default', () => {
    expect(component.form.valid).toBeFalsy();
  });

  // can set values
  it('can change form values', () => {
    const form = component.form;
    form.controls.name.setValue('unit test');
    form.controls.quantity.setValue(OrderQuantity.HalfDozen);
    expect(form.value).toEqual({
      name: 'unit test',
      quantity: OrderQuantity.HalfDozen
    });
    expect(form.valid).toBeTruthy();
    form.controls.name.setValue('');
    expect(form.valid).toBeFalsy();
  });

  // submit places order and routes
  it('places order and routes on submit', () => {
    const form = component.form;
    form.controls.name.setValue('unit test');
    form.controls.quantity.setValue(OrderQuantity.HalfDozen);
    const orderItem: OrderItem = {
      id: 0,
      quantity: OrderQuantity.HalfDozen,
      type: {
        id: 0,
        name: 'donut'
      }
    };
    component.orderItems.push(orderItem);
    const order = {
      name: form.get('name').value,
      items: component.orderItems,
      status: OrderStatus.New
    };
    const svcSpy = spyOn(service, 'placeOrder');
    const routerSpy = spyOn(routerStub, 'navigate');
    component.submit();
    expect(svcSpy).toHaveBeenCalledWith(order);
    expect(routerSpy).toHaveBeenCalledWith(['/']);
  });
});

class RouterStub {
  navigate(url: string) { return url; }
}
