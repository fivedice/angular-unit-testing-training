import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { first } from 'rxjs/operators/first';
import { isNumeric } from 'rxjs/util/isNumeric';
import { GithubResponse } from './github-response.interface';

@Injectable()
export class GithubService {

  public angularVersionSubject: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  public getAngularLatestVersion() {
    this.http.get<GithubResponse[]>('https://api.github.com/repos/angular/angular/tags')
      .pipe(first())
      .subscribe((response: GithubResponse[]) => {
        const latest = response.find((item: GithubResponse) => {
          return isNumeric(item.name.substring(0, 1));
        });
        this.angularVersionSubject.next(latest.name);
      });
  }
}
