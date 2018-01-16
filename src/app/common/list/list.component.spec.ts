import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ListItem } from './list-item.interface';

interface UnitTestListItem extends ListItem {
  id: number;
  name: string;
  pill?: number;
  icon?: string;
}

function getListItems(): Array<UnitTestListItem> {
  return [{
    id: 0,
    name: 'zero',
    pill: 0,
    icon: 'ZERO'
  }, {
    id: 1,
    name: 'one',
    pill: 1,
    icon: 'ONE'
  }, {
    id: 2,
    name: 'two',
    pill: 2,
    icon: 'TWO'
  }];
}

function getItemId(item: UnitTestListItem): number {
  return item.id;
}

function getItemName(item: UnitTestListItem): string {
  return item.name;
}

function getItemPill(item: UnitTestListItem): number {
  return item.pill;
}

function getItemStatusIcon(item: UnitTestListItem): string {
  return item.icon;
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    // COMMON STUFF AND CHANGE DETECTION
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // should render list items

  // should render pill values

  // should render status icon??? How?

  // can get item display value

  // can get pill display value

  // can get icon value

  // ng test --code-coverage
});
