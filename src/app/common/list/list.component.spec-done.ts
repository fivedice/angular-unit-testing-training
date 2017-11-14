import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ListComponent } from './list.component';
import { ListItem } from './list-item.interface';
import { SelectableDirective } from '../selectable.directive';

interface UnitTestListItem extends ListItem {
  id: number;
  name: string;
  pill: number;
}

function getListItems(): Array<UnitTestListItem> {
  return [{
    id: 0,
    name: 'zero',
    pill: 0
  }, {
    id: 1,
    name: 'one',
    pill: 1
  }, {
    id: 2,
    name: 'two',
    pill: 2
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

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        SelectableDirective
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    // This is the EASY way, but...
    // Change detection will only run once per "each" on an OnPush component!
    // HARDER way is to use a Test component. But only do that if you NEED to.
    // Angular CLI generates this, but you want remove it:
    // fixture.detectChanges();

    // common to all tests:
    component.getItemDisplay = getItemName;
    component.listItems = getListItems();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Notice that we are not using async() and whenStable()!
  it('should render list items', () => {
    fixture.detectChanges();
    // If you use whenStable(), that's fine.
    // But you often don't NEED it.
    // If your component doesn't have child components
    // or other async activities then you don't need it.
    // fixture.whenStable().then(() => {
    const y = fixture.debugElement.query(By.css('li'));
    const listItems = fixture.debugElement.queryAll(By.directive(SelectableDirective));
    expect(listItems.length).toBe(3);
    expect(listItems[0].nativeElement.innerText).toBe('zero');
    expect(listItems[1].nativeElement.innerText).toBe('one');
    expect(listItems[2].nativeElement.innerText).toBe('two');
    // });
  });

  it('should render pill values', () => {
    component.getPillDisplay = getItemPill;
    component.showPill = true;
    fixture.detectChanges();
    const y = fixture.debugElement.query(By.css('li'));
    const listItems = fixture.debugElement.queryAll(By.css('.badge'));
    expect(listItems.length).toBe(3);
    expect(listItems[0].nativeElement.innerText).toBe('0');
    expect(listItems[1].nativeElement.innerText).toBe('1');
    expect(listItems[2].nativeElement.innerText).toBe('2');
  });
});
