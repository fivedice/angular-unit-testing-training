import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter,
         ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ListItem } from './list-item.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {

  @Input()
  listItems: Array<ListItem> = [];

  @Input()
  itemIdAccessor: (item: ListItem) => any;

  @Input()
  itemNameAccessor: (item: ListItem) => string;

  @Input()
  itemPillValueAccessor: (item: ListItem) => string | number;

  @Input()
  multipleSelect = false;

  @Input()
  showPill = false;

  @Input()
  showStatusIcon = false;

  @Input()
  itemStatusIconAccessor: (item: ListItem) => string;

  @Output()
  selectionChange: EventEmitter<ListItem[]> = new EventEmitter<ListItem[]>();

  @Output()
  doubleClick: EventEmitter<ListItem> = new EventEmitter<ListItem>();

  private clickCount = 0;
  private debouncer;

  constructor(private changeDetector: ChangeDetectorRef) { }

  getItemDisplay(item: ListItem): string {
    return this.itemNameAccessor(item);
  }

  getPillDisplay(item: ListItem): string | number {
    return this.itemPillValueAccessor(item);
  }

  getStatusIcon(item: ListItem): string {
    return this.itemStatusIconAccessor(item);
  }

  toggleSelection(item: ListItem) {
    if (this.multipleSelect) {
      item.selected = !item.selected;
      const selected = this.listItems.filter(i => i.selected);
      this.selectionChange.emit(selected);
      this.changeDetector.markForCheck();
    } else {
      const itemId = this.itemIdAccessor(item);
      this.listItems.forEach((i: ListItem) => {
        if (this.itemIdAccessor(i) === itemId) {
          i.selected = !i.selected;
        } else {
          i.selected = false;
        }
      });
      this.onItemClick(item);
    }
  }

  private onItemClick(item: ListItem) {
    this.clickCount++;
    if (this.clickCount === 1) {
      this.debouncer = setTimeout(() => {
        this.onSingleClick(item);
        this.clickCount = 0;
      }, 200);
    } else {
      clearTimeout(this.debouncer);
      this.doubleClick.emit(item);
      this.listItems.forEach(li => li.selected = false);
      this.selectionChange.emit([]);
      this.clickCount = 0;
    }
  }

  private onSingleClick(item: ListItem) {
    const selected = this.listItems.filter(i => i.selected);
    this.selectionChange.emit(selected);
    this.changeDetector.markForCheck();
  }
}
