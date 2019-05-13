import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class BookService {
  constructor(
    private apiService: ApiService
  ) { }

  getAll(): Observable<[string]> {
    return this.apiService.get('book&function=getAllbook').pipe(map(data => {
        if (data.success) {
          return data.book;
        } else {
          return data.error;
        }
      }));
  }


  getBookbyGenere(genere: string): Observable<[string]> {
    return this.apiService.get('book&function=getbookbyGenere&param=' + genere).pipe(map(data => {
        if (data.success) {
          return data.book;
        } else {
          return data.error;
        }
      }
      ));
  }

  getBookbyName(query: string): Observable<[String]> {
    return this.apiService.get('book&function=getBookbyName&param=' + query).pipe(map(data => {
        if (data.success) {
          console.log(data);
          return data.book;
        } else {
          return data.error;
        }
      }
      ));
  }

  getBook(id: number): Observable<[string]> {
    return this.apiService.get('book&function=getBookOne&param=' + id).pipe(map(data => {
        if (data.success) {
          return data.book;
        } else {
          return data.error;
        }
      }
      ));
  }

  createBook(book) {
    return this.apiService.post('book&function=createbook', book).pipe(map(data => {
      if (data.success) {
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    }))
  }
}
