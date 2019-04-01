import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CardService {
  constructor (
    private apiService: ApiService
  ) {}

 Addproduct(id: number): Observable<[string]>{
    return this.apiService.get('card&function=addproduct&param=' + id)
    .pipe(map(data => data.product));
  }

  RemoveProduct(id: number): Observable<[string]>{
    return this.apiService.get('card&function=removeproduct&param=' + id)
    .pipe(map(data => data.product));
  }

  getAllProducts(): Observable<[string]>{
    return this.apiService.get('card&function=getAllproducts')
    .pipe(map(data => data.product));
  }

  
}
