import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderListService } from './order-list/order-list.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { DonutService } from './donut-list/donut.service';
import { DonutListComponent } from './donut-list/donut-list.component';
import { OrderItemListComponent } from './order-item-list/order-item-list.component';
import { QuantityPipe } from './common/quantity.pipe';
import { ListComponent } from './common/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent,
    OrderListComponent,
    OrderDetailsComponent,
    DonutListComponent,
    OrderItemListComponent,
    QuantityPipe,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [OrderListService, DonutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
