import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CollectionsService {
  constructor (
    private apiService: ApiService
  ) {}

  getAllcollections(): Observable<[string]>{
    return this.apiService.get('collections&function=getAllCollections').pipe(map(data => { 
      if(data.success){
          return data.collections;
        }else{
          return data.error;
        }
      }
    ));
  }

  getCollection(id: number): Observable<[string]>{
    return this.apiService.get('collections&function=getCollection&param=' + id).pipe(map(data => { 
      if(data.success){
          return data.collections;
        }else{
          return data.error;
        }
      }
    ));
  }

  deletecolection(id: number){
    this.apiService.get('collections&function=deleteCollection&param=' + id).pipe(map(data => { 
      if(data.success){
          return data.message;
        }else{
         return data.error;
        }
      }
    ));
  }

  addCollection(collection: string){
    this.apiService.post('collections&function=addCollection', collection).pipe(map(data => { 
      if(data.success){
          return data.collection;
        }else{
           return data.error;
        }
      }
    ));
  }


  addelement(collection){
    this.apiService.post('collections&function=addelement', collection)
    .pipe(map(data => { 
      if(data.success){
          return data.collection;
        }else{
           return data.error;
        }
      }
    ));
  }

}
