import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderListComponent } from '../order-list/order-list.component';
import { Order } from '../models/order.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  @ViewChild(OrderListComponent)
  public orderList: OrderListComponent;

  public selectedOrders: Order[] = [];

  constructor(private router: Router) { }

  public orderButtonClick() {
    this.router.navigate(['order']);
  }

  public viewOrderButtonClick() {
    this.router.navigate(['orderdetails']);
  }

  public onSelectionChanged(orders: Order[]) {
    this.selectedOrders = orders;
  }
}
