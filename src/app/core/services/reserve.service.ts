import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ReserveService {
  constructor (
    private apiService: ApiService
  ) {}

  getAllReserves(): Observable<[string]>{
    return this.apiService.get('reserve&function=getAllreserves')
    .pipe(map(data => data.reserve));
  }

  getOneReserve(id: number): Observable<[string]>{
    return this.apiService.get('reserve&function=getOnereserve&param=' + id)
    .pipe(map(data => data.reserve));
  }
  
  addReserve(id: number): Observable<[string]>{
    return this.apiService.get('reserve&function=addOnereserve&param=' + id)
    .pipe(map(data => data.reserve));
  }

  removeReserve(id: number): Observable<[string]>{
    return this.apiService.get('reserve&function=removeOnereserve&param=' + id)
    .pipe(map(data => data.reserve));
  }

}
