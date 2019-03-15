import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class BookService {
  constructor (
    private apiService: ApiService
  ) {}

  getAll(): Observable<[string]> {
    return this.apiService.get('book&function=getBook')
          .pipe(map(data => data.book));
  }

  /*
  getAnimebyGenere(genere: string): Observable<[string]> {
    return this.apiService.get('anime&function=getAnimebyGenere&param='+genere)
          .pipe(map(data => data.anime));
  }
  getAnimebyYear(year: number): Observable<[string]> {
    return this.apiService.get('anime&function=getAnimebyYear&param='+year)
          .pipe(map(data => data.anime));
  }

  getAnimebyKind(kind: string): Observable<[string]> {
    return this.apiService.get('anime&function=getAnimebyKind&param='+kind)
          .pipe(map(data => data.anime));
  }

  getAnimebyAuthor(author: string): Observable<[string]> {
    return this.apiService.get('anime&function=getAnimebyAuthor&param='+author)
          .pipe(map(data => data.anime));
  }

  getAnimebyLanguaje(languaje: string): Observable<[string]> {
    return this.apiService.get('anime&function=getAnimebyLanguaje&param='+languaje)
          .pipe(map(data => data.anime));
  }

  getAnimebyStudio(studio: string): Observable<[string]> {
    return this.apiService.get('anime&function=getAnimebyStudio&param='+studio)
          .pipe(map(data => data.anime));
  }

  getAnime(id: number): Observable<[string]>{
    return this.apiService.get('anime&function=getAnimeOne&param='+id)
    .pipe(map(data => data.anime));
  }
*/
}
