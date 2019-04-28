import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map ,  distinctUntilChanged } from 'rxjs/operators';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    public toastCtrl: ToastController
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      const token = this.jwtService.getToken();
      this.apiService.post('user&function=getuser',{"token": token})
      .subscribe(
        data => {
          if(data.success){
            this.setAuth(data.user);
          }else{
            this.sendNotification(data.error);
          }
        }
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  async sendNotification(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? 'login' : 'signup_user';
    return this.apiService.post('user&function='+route, {user: credentials})
      .pipe(map(
      data => {
        if(data.success){
          this.sendNotification("Todo realizado con exito");
          this.setAuth(data.user);
          return data.user;
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  update_img(img){
    return this.apiService.put('user&function=upload_avatar', { img })
    .pipe(map(data => {
      if(data.success){
        this.sendNotification("Todo realizado con exito");
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
      }else{
        this.sendNotification(data.error);
      }
    }));

  }

  loadpais(){
    return this.apiService.get('user&function=load_pais_user&param=' + true)
    .pipe(map(data => {
      if(data.success){
        this.sendNotification("Todo realizado con exito");
        // Update the currentUser observable
        this.currentUserSubject.next(data.paises);
        return data.paises;
      }else{
        this.sendNotification(data.error);
      }
    }));
  }

  loadProvincia(){
    return this.apiService.get('user&function=load_provincias_user&param=' + true)
    .pipe(map(data => {
      if(data.success){
        this.sendNotification("Todo realizado con exito");
        // Update the currentUser observable
        this.currentUserSubject.next(data.provincias );
        return data.provincias;
      }else{
        this.sendNotification(data.error);
      }
    }));
  }

  loadPoblacion(){
    return this.apiService.get('user&function=load_poblaciones_user&param=' + true)
    .pipe(map(data => {
      if(data.success){
        this.sendNotification("Todo realizado con exito");
        // Update the currentUser observable
        this.currentUserSubject.next(data.poblaciones);
        return data.poblaciones;
      }else{
        this.sendNotification(data.error);
      }
    }));
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService.put('user&function=modify', { user })
    .pipe(map(data => {
      if(data.success){
        this.sendNotification("Todo realizado con exito");
        // Update the currentUser observable
        this.currentUserSubject.next(data.user);
        return data.user[0];
      }else{
        this.sendNotification(data.error);
      }
    }));
  }

}
