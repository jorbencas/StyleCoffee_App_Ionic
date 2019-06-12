import { Component, OnInit, Input  } from '@angular/core';
import { CollectionsService, User, UserService } from '../core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss']
})

export class CollectionsListComponent implements OnInit {

  collectionsForm: FormGroup;

   // "value" passed in componentProps
   @Input() isbn: number;

  constructor( 
    private Collectionsservices: CollectionsService,
    public modalCtrl: ModalController,
    private userService: UserService,
    private route: ActivatedRoute, 
    private router: Router,
    private fb: FormBuilder,
    public toastCtrl: ToastController) {
      
    this.collectionsForm = this.fb.group({
      'collectionname': ['', Validators.maxLength(25)]
    });
     }
     
  collections = [];
  element = {};
  addcollection = false;
  authenticated = false;
  currentUser: User;

  ngOnInit() {
    let _this = this;
    this.Collectionsservices.getAllcollections().subscribe(collections =>{
      this.collections = collections.map( e => { e['checked'] = e['idbook'] == _this.isbn || e['idcoffee'] == _this.isbn ?  true : false; return e;});
    });
    console.log(this.addcollection);
    console.log(this.collections);
    this.cangetauth();
  }

  dismiss(data?: any) {
    this.modalCtrl.dismiss(data);
  }

  cangetauth() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.authenticated = authenticated;
        if (authenticated) {
          this.currentUser = this.userService.getCurrentUser();
        }
      }
    );
  }

  addelement(collection){
    this.element = {'id': collection.id,'user':this.currentUser.usuario,'name':collection.name, 'idbook':this.isbn, 'idcoffee':''};
    //console.log(this.element);
    this.Collectionsservices.addelement(this.element).subscribe(collections =>{
      console.log(collections);
       this.sendNotification("She ha añadido el libro a la colección");
      collections['checked'] = collections['idbook'] == this.isbn || collections['idcoffee'] == this.isbn ?  true : false;
      this.collections.find( e => e['checked'] = e['id'] === collections['id'] ? true: false);
    });;
  }

  removelement(collection){
    let _this = this;
    this.element = {'id': collection.id,'user':this.currentUser.usuario,'name':collection.name, 'idbook':this.isbn, 'idcoffee':''};
    console.log(this.element);
    this.Collectionsservices.removelement(this.element).subscribe(collections =>{
       this.sendNotification("She ha eliminado la colección");
      this.collections = [];
      console.log(collections);
      if(collection.length > 0){
      this.collections = collections.map( e => { e['checked'] = (e['idbook'] == _this.isbn || e['idcoffee'] == _this.isbn) ?  true : false; return e;});
      }else{
        this.collections.push(collections);
      }
    });;
  }

  submitForm (){
    this.element = {'user': this.currentUser.usuario ,'collection': this.collectionsForm.value};
    this.Collectionsservices.addCollection(this.element).subscribe(collections =>{
      this.collections = collections.map( e => {return e;});
      this.sendNotification("Se ha añadido la colección");
      this.addcollection = true;
      this.router.navigateByUrl('/details/' + this.isbn);
    });
   
  }


  async sendNotification(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 1000
    });
    toast.present();
  }


  manageevent(collection){
    if(!collection.checked){
      this.addelement(collection);
      this.sendNotification("Se ha añadido el libro con " + this.isbn + " la colección");
    }else{
      this.removelement(collection);
      this.sendNotification("Se ha eliminado el libro con " + this.isbn + " la colección");
    }
  }
}
