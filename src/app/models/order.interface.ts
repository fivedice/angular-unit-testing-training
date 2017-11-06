import { OrderStatus } from './order-status.enum';
import { OrderItem } from './order-item.interface';
import { ListItem } from '../common/list/list-item.interface';

export interface Order extends ListItem {
  id?: number;
  name: string;
  status: OrderStatus;
  items: OrderItem[];
}
