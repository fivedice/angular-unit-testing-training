import { TestBed, inject } from '@angular/core/testing';

import { GithubService } from './github.service';

describe('GithubService', () => {
  // globals

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports
      providers: [GithubService]
    });

    // set globals
    // response = {
    //   name: 'unittest',
    //   zipball_url: 'http://api.github.com',
    //   tarball_url: 'http://api.github.com',
    //   commit: {
    //     sha: '123',
    //     url: 'http://api.github.com'
    //   }
    // };
  });

  // reduce boilerplate
  it('should be created', inject([GithubService], (service: GithubService) => {
    expect(service).toBeTruthy();
  }));

  // test that a get request is made (not the result) async

  // test that the version is returned async

  // test larger array

  // undefined if not found
});
