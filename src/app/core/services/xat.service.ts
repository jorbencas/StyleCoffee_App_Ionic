import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class XatService {
  constructor (
    private apiService: ApiService
  ) {}

  getAllReserves(): Observable<[string]>{
    return this.apiService.get('reserve&function=getAllreserves')
    .pipe(map(data => data.reserve));
  }
/*
  getEpisodes(id: Number): Observable<[string]>{
    return this.apiService.get('episode&function=getEpisodes&param='+id)
    .pipe(map(data => data.episodes));
  }

  getEpisode(id: Number): Observable<[string]>{
    return this.apiService.get('episode&function=getEpisodeOne&param='+id)
    .pipe(map(data => data.episode));
  }
*/
}
