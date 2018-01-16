import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // imports for spy approach after doing the mocked approach
      // providers
      declarations: [ HomeComponent ]
      // isolate
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // can render angular version (mocked)

  // can render angular version (spies) then back to slides

  // routes on button click
});

// RouterStub then back to slides

// MockGithubService
