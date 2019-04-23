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
    return this.apiService.get('book&function=getAllfavorites')
    .pipe(map(data => data.favorites));
  }

  addFavorite(id: string, user: string): Observable<[string]>{
    return this.apiService.get('book&function=addFavorite&param=' + id + '&param2=' + user)
    .pipe(map(data => data.success));
  }

  removeFavorite(id: number, user: string): Observable<[string]>{
    return this.apiService.get('user&function=removeFavorite&param=' + id + '&param2=' + user)
    .pipe(map(data => data.success));
  }

}
