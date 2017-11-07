import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, EventEmitter, Output } from '@angular/core';
import { DonutService } from '../donut-list/donut.service';
import { Subscription } from 'rxjs/Subscription';
import { Donut } from '../models/donut.interface';
import { ListItem } from '../common/list/list-item.interface';

@Component({
  selector: 'app-donut-list',
  templateUrl: './donut-list.component.html',
  styleUrls: ['./donut-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutListComponent implements OnInit, OnDestroy {

  @Output()
  selectionChange: EventEmitter<Donut> = new EventEmitter<Donut>();

  @Output()
  doubleClick: EventEmitter<Donut> = new EventEmitter<Donut>();

  donuts: Donut[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private donutService: DonutService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscriptions.push(
      this.donutService.donutsChanged$.subscribe((doughnuts: Donut[]) => {
        this.donuts = doughnuts.sort((a, b) => {
          return (a < b) ? -1 : (a > b) ? 1 : 0;
        });
        this.changeDetector.markForCheck();
      }));
    this.donutService.getDonuts();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      if (!sub.closed) {
        sub.unsubscribe();
      }
    });
  }

  getItemId(donut: Donut): number {
    return donut.id;
  }

  getItemName(donut: Donut): string {
    return donut.name;
  }

  selectionChanged(donuts: Donut[]) {
    const donut: Donut = (donuts.length > 0) ? donuts[0] : undefined;
    this.selectionChange.emit(donut);
  }

  onDoubleClick(donut: Donut) {
    this.doubleClick.emit(donut);
  }
}
