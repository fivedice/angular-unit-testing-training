import { Donut } from './donut.interface';
import { OrderQuantity } from './order-quantity.enum';
import { ListItem } from '../common/list/list-item.interface';

export interface OrderItem extends ListItem {
  id: number;
  type: Donut;
  quantity: OrderQuantity;
}
