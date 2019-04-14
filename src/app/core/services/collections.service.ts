import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import _ from 'underscore';
//import { Collections } from '../models';
import { ToastController } from '@ionic/angular';

@Injectable()
export class CollectionsService {
  constructor (
    private apiService: ApiService,
    private _:_,
    public toastCtrl: ToastController
  ) {}
  /*
   item = [];
   Item = [];
   cartItems = JSON.parse(localStorage.getItem('cart'));
  total = 0.00;

  async sendNotification(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

 Addproduct(id: number): Observable<[string]>{
    return this.apiService.get('Collections&function=addproduct&param=' + id)
    .pipe(map(data =>  {
      if(data.succes){
          this.sendNotification("Todo realizado con exito");
          return  data.product;
        }else{
          this.sendNotification(data.error);
        }
      }
      ));
  }

  RemoveProduct(id: number): Observable<[string]>{
    return this.apiService.get('Collections&function=removeproduct&param=' + id)
    .pipe(map(data => {
      if(data.succes){
          this.sendNotification("Todo realizado con exito");
          return  data.product;
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
  }

  getAllProducts(): Observable<[string]>{
    return this.apiService.get('Collections&function=getAllproducts')
    .pipe(map(data =>  {
      if(data.succes){
          this.sendNotification("Todo realizado con exito");
          return  data.product;
        }else{
          this.sendNotification(data.error);
        }
      }
    ));
  }

  getCollections(){
    this._.each(this.cartItems, function (item) {
      this.total += item.price;
    });
    this.total.toFixed(2),
    this.cart =  this.cartItems ? this.cartItems : 0;
	};




 AddtoCollections(kind,cart){
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
        return  this.apiService.post(`Collections&function=addcharge`, {carrito})
        .pipe(map(res => {

          }));
      }
    };
  
   RemoveFromCollections(cart){
    
  };
*/
}
