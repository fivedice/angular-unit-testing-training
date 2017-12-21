import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailComponent } from './order-detail.component';
import { RouterTestingModule, } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderService } from '../order/order.service';
import { OrderStatus } from '../models/order-status.enum';

fdescribe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;
  let orderService: OrderService;
  let params: Subject<Params>;

  beforeEach(async(() => {
    params = new Subject<Params>();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [OrderDetailComponent],
      providers: [
        OrderService,
        { provide: ActivatedRoute, useValue: { params: params } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    orderService = TestBed.get(OrderService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be blank by default', () => {
    expect(fixture.debugElement.nativeElement.innerText).toContain('Name:\nStatus:\nItems:');
  });

  it('can respond to new route params', () => {
    const spy = spyOn(orderService, 'getOrder').and.callFake((id) => {
      return {
        id: id,
        name: `Unit Test ${id}`,
        status: OrderStatus.New,
        items: []
      };
    });
    params.next({ id: 0 });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(fixture.debugElement.nativeElement.innerText).toContain('Name: Unit Test 0\nStatus: 0\nItems:');
    params.next({ id: 1 });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(fixture.debugElement.nativeElement.innerText).toContain('Name: Unit Test 1\nStatus: 0\nItems:');
  });
});
