import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ReserveService {
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


  getAllReserves(user: string ): Observable<[string]>{
    return this.apiService.get('reserve&function=getAllreserves&param=' + user)
    .pipe(map(data => {
      if(data.success){
        //this.sendNotification("Se ha creado la reserva del libro" + data.reserve.titulo +" con exito");
        return data.reserves;
      }else{
        this.sendNotification(data.error);
      }
    }
    ));
  }

  getOneReserve(id: number): Observable<[string]>{
    return this.apiService.get('reserve&function=getOnereserve&param=' + id)
    .pipe(map(data => {
      if(data.success){
        this.sendNotification("Se ha creado la reserva del libro" + data.reserve.titulo +" con exito");
        return data.reserve;
      }else{
        this.sendNotification(data.error);
      }
    }
    ));
  }
  
  addReserve(elem: JSON, user: string, id: number): Observable<[string]>{
    const data = {"element":elem, 'usuario':user, 'idbook':id};
    console.log(data);
    debugger;
    return this.apiService.post('reserve&function=addOnereserve', {'data':data})
    .pipe(map(data => {
      if(data.success){
        this.sendNotification("Se ha creado la reserva del libro" + data.reserve.titulo +" con exito");
        return data.reserve;
      }else{
        this.sendNotification(data.error);
      }
    }
    ));
  }

  removeReserve(reserve): Observable<[string]>{
    return this.apiService.post('reserve&function=removeOnereserve', reserve)
    .pipe(map(data => {
      if(data.success){
        this.sendNotification("Se ha eliminado la reserva del libro" + data.reserve.titulo +" con exito");
        return data.reserve;
      }else{
        this.sendNotification(data.error);
      }
    }
    ));
  }

}
