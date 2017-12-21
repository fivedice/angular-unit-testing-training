import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { EasterEggComponent } from './misc/easter-egg/easter-egg.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '*', component: HomeComponent },
  { path: 'order', component: OrderComponent },
  { path: 'orderdetails/:id', component: OrderDetailsComponent, pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: EasterEggComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
