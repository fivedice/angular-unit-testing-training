import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailComponent } from './order-detail.component';

describe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;
  // service
  // params

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: [ OrderDetailComponent ]
      // isolate
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // set service
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // should be blank by default

  // can respond to new route params
  
});
