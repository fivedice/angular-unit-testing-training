import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderService } from '../order/order.service';
import { GithubService } from '../common/github-service/github.service';
import { Subject } from 'rxjs/Subject';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderComponent } from '../order/order.component';
import { Router } from '@angular/router';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  // let service: MockGithubService;
  let service: GithubService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        OrderService,
        // { provide: GithubService, useClass: MockGithubService }
        GithubService,
        { provide: Router, useClass: RouterStub }
      ],
      declarations: [
        HomeComponent,
        OrderComponent
      ],
      // Ignore child components
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    service = TestBed.get(GithubService);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('can render angular version (mocked)', () => {
  //   service.returnValue = '123';
  //   fixture.detectChanges();
  //   expect(fixture.debugElement.nativeElement.innerText)
  //     .toContain('Current Angular Release is version 123');
  // });

  it('can render angular version (spies)', () => {
    const spy = spyOn(service, 'getAngularLatestVersion').and.callFake(
      () => {
        service['angularVersionSubject$'].next('123');
      });
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerText)
      .toContain('Current Angular Release is version 123');
  });

  it('routes on button click', () => {
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const button = buttons.find((item) => {
      return item.nativeElement.innerText === 'Order Now';
    });
    expect(button).toBeDefined();
    const spy = spyOn(router, 'navigate');
    button.nativeElement.click();
    expect(spy.calls.first().args[0]).toEqual(['order']);
    expect(spy).toHaveBeenCalledWith(['order']);
  });
});

class RouterStub {
  navigate(url: string) { return url; }
}

// class MockGithubService {
//   returnValue: string;
//   angularVersionSubject$: Subject<string> = new Subject<string>();
//   getAngularLatestVersion() {
//     this.angularVersionSubject$.next(this.returnValue);
//   }
// }
