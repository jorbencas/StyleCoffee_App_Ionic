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
      duration: 1000
    });
    toast.present();
  }

  getAllEvents(): Observable<[string]>{
    return this.apiService.get('events&function=getAllevents')
    .pipe(map(data => { 
      if(data.success){
        this.sendNotification(data);
          return data.events;
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
  }

  getMyauthors(user: string):Observable<[string]>{
    return this.apiService.get('events&function=getMyauthors&param=' + user)
    .pipe(map(data => { 
      if(data.success){
          return data.authors;
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
    
  }
  getMyevents(user: string):Observable<[string]>{
    return this.apiService.get('events&function=getMyevents&param=' + user)
    .pipe(map(data => { 
      if(data.success){
          this.sendNotification("Todo mis eventos cargados con exito");
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
          this.sendNotification("Se ha eliminado con exito");
        }else{
          this.sendNotification("Error: " + data.error);
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
          this.sendNotification("Error: " + data.error);
        }
      }
    ));
  }


  addElement(Event: Object): Observable<[string]>{
    return this.apiService.post('events&function=addelement', {'event': Event})
    .pipe(map(data => { 
      if(data.success){
          this.sendNotification("Todo realizado con exito");
          return data.events;
        }else{
          this.sendNotification("Error: " + data.error);
        }
      }
    ));
  }

  removeElement(Event: Object): Observable<[string]>{
    return this.apiService.post('events&function=removeelement', {'event': Event})
    .pipe(map(data => { 
      if(data.success){
          this.sendNotification("La dessubscribció se ha realizado con exito");
          return data.events;
        }else{
          this.sendNotification("Error: " + data.error);
        }
      }
    ));
  }

}
