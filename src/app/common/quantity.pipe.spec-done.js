import { TestBed } from '@angular/core/testing';

import { QuantityPipe } from './quantity.pipe';
import { OrderQuantity } from '../models/order-quantity.enum';

fdescribe('QuantityPipe', () => {
  let pipe: QuantityPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuantityPipe]
    });
    pipe = TestBed.get(QuantityPipe);
  });

  it('can create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('can transform OrderQuantity', () => {
    expect(pipe.transform(OrderQuantity.Single)).toBe(1);
    expect(pipe.transform(OrderQuantity.HalfDozen)).toBe(6);
    expect(pipe.transform(OrderQuantity.OneDozen)).toBe(12);
    expect(pipe.transform(OrderQuantity.TwoDozen)).toBe(24);
  });

  it('returns zero for unknown OrderQuantity', () => {
    expect(pipe.transform(27)).toBe(0);
  });
});
