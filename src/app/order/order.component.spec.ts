import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { Router } from '@angular/router';
import { OrderService } from './order.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderComponent],
      providers: [
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // defaults

  // is not valid by default

  // can set values

  // submit places order and routes - Can you do this on your own?
});

class RouterStub {
  navigate(url: string) { return url; }
}
