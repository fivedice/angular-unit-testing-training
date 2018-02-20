import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController }
  from '@angular/common/http/testing';
import { TestRequest } from '@angular/common/http/testing/src/request';

import { GithubService } from './github.service';
import { GithubResponse } from './github-response.interface';

fdescribe('GithubService', () => {
  let service: GithubService;
  let controller: HttpTestingController;
  let response: GithubResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        GithubService
      ]
    });
    service = TestBed.get(GithubService);
    controller = TestBed.get(HttpTestingController);
    response = {
      name: 'unittest',
      zipball_url: 'http://api.github.com',
      tarball_url: 'http://api.github.com',
      commit: {
        sha: '123',
        url: 'http://api.github.com'
      }
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // This just tests that the get call works, not what it returns.
  it('can call getAngularLatestVersion', async(() => {
    service.getAngularLatestVersion();
    const request: TestRequest =
      controller.expectOne('https://api.github.com/repos/angular/angular/tags');
    request.flush([response]);
    expect(request.request.method).toEqual('GET');
  }));



  // STOP HERE and cover OBSERVABLES



  // it('can return latest Angular version', async(() => {
  //   service.angularVersionSubject$.subscribe((version: string) => {
  //     expect(version).toBe('123.0.0');
  //     // fail();
  //   });
  //   response.name = '123.0.0';
  //   service.getAngularLatestVersion();
  //   const request: TestRequest =
  //     controller.expectOne('https://api.github.com/repos/angular/angular/tags');
  //   request.flush([response]);
  // }));

  // it('will return undefined if no version number found', async(() => {
  //   service.angularVersionSubject$.subscribe((version: string) => {
  //     expect(version).toBeUndefined();
  //   });
  //   service.getAngularLatestVersion();
  //   const request: TestRequest =
  //     controller.expectOne('https://api.github.com/repos/angular/angular/tags');
  //   request.flush([response]);
  // }));

  // it('can return latest Angular version from bigger array', async(() => {
  //   service.angularVersionSubject$.subscribe((version: string) => {
  //     expect(version).toBe('1.0.0');
  //   });
  //   const versioned = Object.assign({}, response, { name: '1.0.0' });
  //   service.getAngularLatestVersion();
  //   const request: TestRequest =
  //     controller.expectOne('https://api.github.com/repos/angular/angular/tags');
  //   request.flush([response, response, versioned]);
  // }));

  // // WHY do we need this test?
  // // Look at the logic of the service code.
  // it('can return latest Angular version from bigger array', async(() => {
  //   service.angularVersionSubject$.subscribe((version: string) => {
  //     expect(version).toBe('2.0.0');
  //   });
  //   const versioned1 = Object.assign({}, response, { name: '1.0.0' });
  //   const versioned2 = Object.assign({}, response, { name: '2.0.0' });

  //   service.getAngularLatestVersion();
  //   const request: TestRequest =
  //     controller.expectOne('https://api.github.com/repos/angular/angular/tags');
  //   request.flush([response, response, versioned2, versioned1]);
  // }));
});
