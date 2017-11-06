import { TestBed, inject } from '@angular/core/testing';

import { OrderListService } from './order-list.service';

describe('OrderListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderListService]
    });
  });

  it('should be created', inject([OrderListService], (service: OrderListService) => {
    expect(service).toBeTruthy();
  }));
});
