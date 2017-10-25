import { DonutType } from './donut-type.interface';
import { OrderQuantity } from './order-quantity.enum';

export interface OrderItem {
  type: DonutType;
  quantity: OrderQuantity;
}
