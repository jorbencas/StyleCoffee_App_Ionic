import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CoffeeService {
  constructor (
    private apiService: ApiService
  ) {}

  getAllcoffe(): Observable<[string]>{
    return this.apiService.get('coffee&function=getAllcoffee')
    .pipe(map(data => data.coffee));
  }
/*
  getCharacters(id: Number): Observable<[string]>{
    return this.apiService.get('character&function=getCharacters&param='+id)
    .pipe(map(data => data.characters));
  }

  getCharacter(id: Number): Observable<[string]>{
    return this.apiService.get('character&function=getCharacter&param='+id)
    .pipe(map(data => data.character));
  }
*/
}
