import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import {
  ApiService,
  AuthGuard,
  JwtService,
  ProfilesService,
  UserService,
  BookService,
  ReserveService,
  CoffeeService,
  XatService,
  CollectionsService
} from './services';

@NgModule({
  imports: [
    CommonModule
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
    XatService,
    CollectionsService
  ],
  declarations: []
})
export class CoreModule { }
