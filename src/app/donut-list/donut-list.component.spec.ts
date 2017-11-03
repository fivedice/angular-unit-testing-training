import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutListComponent } from './donut-list.component';

describe('DonutListComponent', () => {
  let component: DonutListComponent;
  let fixture: ComponentFixture<DonutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
