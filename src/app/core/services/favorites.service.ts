import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class FavoriteService {
  constructor (
    private apiService: ApiService
  ) {}

  getAllFavorites(): Observable<[string]>{
    return this.apiService.get('user&function=getAllfavorites')
    .pipe(map(data => data.favorite));
  }

  addFavorite(id: number): Observable<[string]>{
    return this.apiService.get('user&function=addFavorite&param=' + id)
    .pipe(map(data => data.favorite));
  }

  removeFavorite(id: number): Observable<[string]>{
    return this.apiService.get('user&function=removeFavorite&param=' + id)
    .pipe(map(data => data.favorite));
  }

}
