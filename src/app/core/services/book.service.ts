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
    return this.apiService.get('book&function=getAllbook')
          .pipe(map(data => data.book));
  }

  
  getBookbyGenere(genere: string): Observable<[string]> {
    return this.apiService.get('anime&function=getbookbyGenere&param='+genere)
          .pipe(map(data => data.anime));
  }
  
  getBook(id: number): Observable<[string]>{
    return this.apiService.get('book&function=getBookOne&param='+id)
    .pipe(map(data => data.book));
  }

}
