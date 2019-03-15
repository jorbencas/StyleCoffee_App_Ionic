import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { HttpClientModule } from '@angular/common/http';
import {
  ApiService,
  AuthGuard,
  JwtService,
  ProfilesService,
  UserService,
  BookService,
  ReserveService,
  CoffeeService,
  XatService
} from './services';

@NgModule({
  imports: [
    CommonModule,HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    AuthGuard,
    JwtService,
    ProfilesService,
    UserService,
    BookService,
    ReserveService,
    CoffeeService,
    XatService
  ],
  declarations: []
})
export class CoreModule { }
