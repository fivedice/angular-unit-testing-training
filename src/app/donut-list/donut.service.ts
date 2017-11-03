import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { first } from 'rxjs/operators/first';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


import { Donut } from '../models/donut.interface';

@Injectable()
export class DonutService {

  public donutsChanged$: Subject<Donut[]> = new Subject<Donut[]>();

  constructor(private http: HttpClient) { }

  public getDonuts() {
    this.http.get<Donut[]>('../assets/donuts.json').pipe(first()).subscribe((donuts: Donut[]) => {
      this.donutsChanged$.next(donuts);
    });
  }
}
