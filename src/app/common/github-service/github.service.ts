import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { first } from 'rxjs/operators/first';
import { isNumeric } from 'rxjs/util/isNumeric';
import { GithubResponse } from './github-response.interface';

@Injectable()
export class GithubService {

  angularVersionSubject$: Observable<string>;

  private angularVersionSubject: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
    this.angularVersionSubject$ = this.angularVersionSubject.asObservable();
  }

  getAngularLatestVersion() {
    this.http.get<GithubResponse[]>('https://api.github.com/repos/angular/angular/tags')
      .pipe(first())
      .subscribe((response: GithubResponse[]) => {
        const latest = response.find((item: GithubResponse) => {
          return isNumeric(item.name.substring(0, 1));
        });
        this.angularVersionSubject.next(latest ? latest.name : undefined);
      });
  }
}
