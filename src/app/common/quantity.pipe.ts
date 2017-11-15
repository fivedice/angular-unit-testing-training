import { Pipe, PipeTransform } from '@angular/core';
import { OrderQuantity } from '../models/order-quantity.enum';

@Pipe({
  name: 'quantity'
})
export class QuantityPipe implements PipeTransform {

  transform(value: OrderQuantity, args?: any): number {
    switch (value) {
      case OrderQuantity.Single:
        return 1;
      case OrderQuantity.HalfDozen:
        return 6;
      case OrderQuantity.OneDozen:
        return 12;
      case OrderQuantity.TwoDozen:
        return 24;
      default:
        return 0;
    }
  }

}
