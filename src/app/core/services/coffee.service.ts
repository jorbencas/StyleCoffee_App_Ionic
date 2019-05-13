import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CoffeeService {
  constructor(
    private apiService: ApiService
  ) { }

  getAllcoffe(): Observable<[string]> {
    return this.apiService.get('coffee&function=getAllcoffee')
      .pipe(map(data => {
        if (data.success) {
          return data.coffee;
        } else {
          return data.error;
        }
      }
      ));
  }

  getCoffee(id: number): Observable<[string]> {
    return this.apiService.get('coffee&function=getcoffee&param=' + id)
      .pipe(map(data => {
        if (data.success) {
          return data.coffee;
        } else {
          return data.error;
        }
      }
      ));
  }

  getByKind(kind: string): Observable<[string]> {
    return this.apiService.get('coffee&function=getbykind&param=' + kind)
      .pipe(map(data => {
        if (data.succes) {
          return data.coffee;
        } else {
          return data.error;
        }
      }

      ));
  }

}
