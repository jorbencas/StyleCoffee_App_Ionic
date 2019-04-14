import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable()
export class CoffeeService {
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

  getAllcoffe(): Observable<[string]>{
    return this.apiService.get('coffee&function=getAllcoffee')
    .pipe(map(data => { 
      if(data.success){
          this.sendNotification("Todo realizado con exito");
          return data.coffee;
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
  }

  getCoffee(id: number): Observable<[string]>{
    return this.apiService.get('coffee&function=getcoffee&param=' + id)
    .pipe(map(data => { 
      if(data.success){
          this.sendNotification("Todo realizado con exito");
          return data.coffee;
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
  }

  getByKind(kind: string): Observable<[string]>{
    return this.apiService.get('coffee&function=getbykind&param=' + kind)
    .pipe(map(data => { 
      if(data.succes){
          this.sendNotification("Todo realizado con exito");
          return data.coffee;
        }else{
          this.sendNotification(data.error);
        }
     }
      
      ));
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
