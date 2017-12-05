import { Component } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SelectableDirective } from './selectable.directive';

fdescribe('SelectableDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SelectableDirective,
        TestComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new SelectableDirective();
    expect(directive).toBeTruthy();
  });

  it('should not have active class when selected is false', () => {
    expect(fixture.debugElement.query(By.css('div')).classes)
      .not.toEqual({ active: true });
  });

  it('should have active class when selected is true', () => {
    component.selected = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('div')).classes)
      .toEqual({ active: true });
  });
});

@Component({
  selector: 'app-test',
  template: `
    <div appSelectable
         [selected]="selected">
      Hello
    </div>`
})
class TestComponent {
  selected = false;
}
