import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable()
export class CollectionsService {
  constructor (
    private apiService: ApiService,
    public toastCtrl: ToastController
  ) {}
  
    
  async sendNotification(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  getAllcollections(): Observable<[string]>{
    return this.apiService.get('collections&function=getAllCollections')
    .pipe(map(data => { 
      if(data.success){
          this.sendNotification("Todo realizado con exito");
          return data.collections;
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
  }

  getCollection(id: number): Observable<[string]>{
    return this.apiService.get('collections&function=getCollection&param=' + id)
    .pipe(map(data => { 
      if(data.success){
          //this.sendNotification("Todo realizado con exito");
          return data.collections;
        }else{
          //this.sendNotification(data.error);
        }
      }
    ));
  }

  deletecolection(id: number){
    this.apiService.get('collections&function=deleteCollection&param=' + id)
    .pipe(map(data => { 
      if(data.success){
          this.sendNotification("Todo realizado con exito");
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
  }

  addCollection(collection: string){
    this.apiService.post('collections&function=addCollection', collection)
    .pipe(map(data => { 
      if(data.success){
          this.sendNotification("Todo realizado con exito");
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
  }


  addelement(collection){
    this.apiService.post('collections&function=addelement', collection)
    .pipe(map(data => { 
      if(data.success){
          this.sendNotification("Todo realizado con exito");
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
  }

}
