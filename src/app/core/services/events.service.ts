import { Injectable, ɵConsole } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable()
export class EventsService {
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

  getAllEvents(): Observable<[string]>{
    return this.apiService.get('events&function=getAllevents')
    .pipe(map(data => { 
      if(data.success){
          this.sendNotification("Todo realizado con exito");
          return data.events;
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
  }

  getEvent(id: number): Observable<[string]>{
    return this.apiService.get('events&function=getOneevents&param=' + id)
    .pipe(map(data => { 
      if(data.success){
          //this.sendNotification("Todo realizado con exito");
          return data.events;
        }else{
          //this.sendNotification(data.error);
        }
      }
    ));
  }

  deleteevent(id: number){
    this.apiService.get('events&function=removeOneevent&param=' + id)
    .pipe(map(data => { 
      if(data.success){
          this.sendNotification("Todo realizado con exito");
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
  }

  addEvent(event: Object){
    console.log(event);
    this.apiService.post('events&function=addOneevent', {"event":event})
    .pipe(map(data => { 
      if(data.success){
          this.sendNotification("Todo realizado con exito");
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
  }


  addelement(Event){
    this.apiService.post('events&function=addelement', Event)
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