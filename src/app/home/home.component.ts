import { Component, ChangeDetectionStrategy, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators/first';
import { OrderListComponent } from '../order-list/order-list.component';
import { Order } from '../models/order.interface';
import { OrderService } from '../order/order.service';
import { OrderStatus } from '../models/order-status.enum';
import { GithubService } from '../common/github-service/github.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  public angularReleaseVersion: string;

  @ViewChild(OrderListComponent)
  public orderList: OrderListComponent;

  public selectedOrders: Order[] = [];

  constructor(private orderService: OrderService,
              private githubService: GithubService,
              private router: Router,
              private changeDetector: ChangeDetectorRef) { }

  public ngOnInit() {
    this.githubService.angularVersionSubject.pipe(first()).subscribe((version: string) => {
      this.angularReleaseVersion = version;
      this.changeDetector.markForCheck();
    });
    this.githubService.getAngularLatestVersion();
  }
  public orderButtonClick() {
    this.router.navigate(['order']);
  }

  public markOrderReadyButtonClick() {
    this.selectedOrders.forEach((order: Order) => {
      this.orderService.changeOrderStatus(order, OrderStatus.Ready);
    });
  }

  public orderPickedUpButtonClick() {
    this.selectedOrders.forEach((order: Order) => {
      this.orderService.changeOrderStatus(order, OrderStatus.PickedUp);
    });
  }

  public disableMarkReadyButton() {
    return this.selectedOrders.length === 0 || !this.selectedOrders.some(order => order.status === OrderStatus.New);
  }

  public disablePickUpButton() {
    return this.selectedOrders.length === 0 || this.selectedOrders.some(order => order.status !== OrderStatus.Ready);
  }

  public onSelectionChanged(orders: Order[]) {
    this.selectedOrders = orders;
  }
}
