import { OrderStatus } from './order-status.enum';
import { OrderItem } from './order-item.interface';

export interface Order {
  name: string;
  status: OrderStatus;
  items: OrderItem[];
  selected?: boolean;
}
