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
        console.log(data);
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

  getCollectionsBook(id: number ): Observable<[string]>{
    return this.apiService.get('collections&function=getCollectionsBook&param=' + id).pipe(map(data => { 
      if(data.success){
          return data.collections;
        }else{
          return data.error;
        }
      }
    ));
  }

  getCollectionsCoffee(id: number ): Observable<[string]>{
    return this.apiService.get('collections&function=getCollectionsCoffee&param=' + id).pipe(map(data => { 
      if(data.success){
          return data.collections;
        }else{
          return data.error;
        }
      }
    ));
  }

  getCollectionsUser(id: string ): Observable<[string]>{
    return this.apiService.get('collections&function=getCollectionsUser&param=' + id).pipe(map(data => { 
      if(data.success){
          return data.collections;
        }else{
          return data.error;
        }
      }
    ));
  }

  deletecolection(id: number, user: string): Observable<[string]>{
    return this.apiService.get('collections&function=deleteCollection&param=' + id + '&param2=' + user).pipe(map(data => { 
      if(data.success){
          return data.collections;
        }else{
         return data.error;
        }
      }
    ));
  }

  addCollection(collection: Object): Observable<[string]>{
    console.log(collection);
    return this.apiService.post('collections&function=addcollection', collection).pipe(map(data => { 
      if(data.success){
        console.log(data.collections);
          return data.collections;
        }else{
           return data.error;
        }
      }
    ));
  }

removelement(collection: Object): Observable<[string]>{
  return this.apiService.post('collections&function=removelement', {'element': collection}).pipe(map(data => { 
    if(data.success){
      console.log(data.collections);
        return data.collections;
      }else{
         return data.error;
      }
    }
  ));
}

  addelement(collection: Object): Observable<[string]>{
    return this.apiService.post('collections&function=addelement', {'element': collection}).pipe(map(data => { 
      if(data.success){
        console.log(data.collections);
          return data.collections;
        }else{
           return data.error;
        }
      }
    ));
  }

}
