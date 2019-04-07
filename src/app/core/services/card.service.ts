import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import _ from 'underscore';
import { _ParseAST } from '@angular/compiler';
import { Card } from '../models';

@Injectable()
export class CardService {
  constructor (
    private apiService: ApiService,
    private _:_,
    private cart : Card
  ) {}
   item = [];
   Item = [];
   cartItems = JSON.parse(localStorage.getItem('cart'));
  total = 0.00;

/*
 Addproduct(id: number): Observable<[string]>{
    return this.apiService.get('card&function=addproduct&param=' + id)
    .pipe(map(data => data.product));
  }

  RemoveProduct(id: number): Observable<[string]>{
    return this.apiService.get('card&function=removeproduct&param=' + id)
    .pipe(map(data => data.product));
  }

  getAllProducts(): Observable<[string]>{
    return this.apiService.get('card&function=getAllproducts')
    .pipe(map(data => data.product));
  }

  getcard(){
    this._.each(this.cartItems, function (item) {
      this.total += item.price;
    });
    this.total.toFixed(2),
    this.cart =  this.cartItems ? this.cartItems : 0;
	};




 AddtoCard(kind,cart){
      this.item.push({'kind':kind,'id':cart.id,'token':0});
      localStorage.setItem('item',JSON.stringify(this.item));
      //dispatch({type:"ADD_TO_CART", cart:cart});
      //toastr.success('El producto ' +cart.title + 'se ha añadido a tu cesta','Bienvenido');
  };
  
 BuyProduct(cart){
    let cartitem = localStorage.getItem('item');
    if (cartitem) {
      let p = JSON.parse(cartitem);
      let itemes = [];
      this._.each(p, function (item) {
        item.token = cart;
        itemes.push(item);
        localStorage.setItem('item',JSON.stringify(itemes));
      });
      let carrito = JSON.parse(localStorage.getItem('item'));
        return  this.apiService.post(`card&function=addcharge`, {carrito})
        .pipe(map(res => {

          }));
      }
    };
  
   RemoveFromcard(cart){
    
  };
*/
}
