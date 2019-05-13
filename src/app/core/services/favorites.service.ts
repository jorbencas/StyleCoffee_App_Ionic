import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable()
export class FavoriteService {
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

  getAllFavorites(): Observable<[string]>{
    return this.apiService.get('book&function=getAllfavorites')
    .pipe(map(data => data.favorites));
  }

  addFavorite(id: number, user: string): Observable<[string]>{
    let data = {"idbook": id, "usuario": user};
    return this.apiService.post('book&function=addFavorite',{"data": data})
    .pipe(map(data => {
      if(data.success){
        this.sendNotification("Se ha añadido con exito");
        return data.favorites;
      }else{
        this.sendNotification(data.error);
      }
    }));
  }

  removeFavorite(id: number, user: string): Observable<[string]>{
    return this.apiService.get('book&function=removeFavorite&param=' + id + '&param2=' + user)
    .pipe(map(data => {
      if(data.success){
        this.sendNotification("Se ha eliminado de favoritos  con exito");
        return data.success;
      }else{
        this.sendNotification(data.error);
      }
    }));
  }

}
