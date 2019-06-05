import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { CoffeeService, User, UserService, BookService, FavoriteService, Filter, CollectionsService } from '../core';
import { CollectionsListComponent } from '../collections-list/collections-list.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-books_coffees',
  templateUrl: 'books_coffees.page.html',
  styleUrls: ['books_coffees.page.scss']
})

export class Tab1Page implements OnInit {
  constructor(
    public alertCtrl: AlertController,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    public modalCtrl: ModalController,
    private CoffeeService: CoffeeService,
    private BookService: BookService,
    private userService: UserService,
    private FavoriteService: FavoriteService,
    public toastCtrl: ToastController,
    private collectionservice: CollectionsService
  ) { }

  books = [];
  colorSecundary = '';
  search = false;
  queryText = '';
  authenticated = false;
  currentUser: User;
  tab_active = 'book';
  coffees = [];
  contentavaible = false;
  books_original = [];
  coffees_original = [];

  tags1 = ["Novela Negra", " Novela Contemporania", "Drama", "Romance", "Acción", "Thriller", "Comedia", 
  " Novela Juvenil", "Infantil", "Libros de Auto ayuda"]
  tags2 = ["Capuchino", "Bombón" , "Descafeinado", "Cortado", "Café solo", "Cafe con leche", "Expreso Doble",
  "Café Jamaicano", "Làgrima", "Instantaneo"]


  ngOnInit(): void {
    this.cangetauth();
    this.presentLoading();
    this.route.params.subscribe(param => {
        this.BookService.getAll().subscribe(books => {
          this.books_original = books.map(eleem => {
            this.collectionservice.getCollectionsBook(eleem['isbn']).subscribe(collection => {
              if(collection.length > 0){
                eleem['collection'] = true;
              }else{
                eleem['collection'] = false;
              }
            });
            return eleem;
          });
          this.books = this.books_original;
        });
        this.CoffeeService.getAllcoffe().subscribe(coffees => {
          this.coffees_original = coffees.map(eleem => { 
            this.collectionservice.getCollectionsCoffee(coffees['id']).subscribe(collection => {
              if(collection.length > 0){
                eleem['collection'] = true;
              }else{
                eleem['collection'] = false;
              }
            });
            return eleem 
          });
          this.coffees = this.coffees_original;
        });
        if (this.coffees.length >= 0 || this.books.length >= 0) {
          this.sendNotification("Todos los libros y cafees se han cargado con exito");
        }
    });
  }

  cansearch() {
    this.search = this.search ? false : true;
  }

  updateSchedule() {
    if (this.tab_active == 'book') {
      const filtrados = this.books.filter(b => b.titulo.toLowerCase().includes(this.queryText));
      this.books = filtrados.map(book => book);
    }else {
      const filtradas = this.coffees.filter(c => c.name.toLowerCase().includes(this.queryText));
      this.coffees = filtradas.map((elem) => { return elem; });
    }
  }

  ngAfterContentChecked() {
    if (this.search && this.queryText == '') {
      if (this.tab_active === 'book') {
        if (this.books_original.length > this.books.length) {
          this.books = this.books_original.map(b => b).sort();
        };
      } else if (this.tab_active === 'coffee') {
        if (this.coffees.length > this.coffees_original.length) {
          this.coffees = this.coffees_original.map(coffees => coffees).sort();
        }
      }
    }
  }


 //Filtros 

  onfilter(filter) {
    if( this.tab_active == 'book'){
      const filtrados = this.books.filter(b => {
        let e = b.genere.split(','); 
        if(e.includes(filter.id)) return b;
      });
      if(filtrados.length > 0) this.books = filtrados.map(book => book);
      if(this.books.length > 0 ) this.filter(filter);
    }else if ( this.tab_active == 'coffee')  {
      const filtradas = this.coffees.filter(c => {
        if(c.kind.includes(filter.filter)){ 
          return c; 
        }});
      if(filtradas.length > 0) this.coffees = filtradas.map((elem) => { return elem; });
      if(this.coffees.length > 0 ) this.filter(filter);
    }
  }

  filter(event) {
    console.log(event);
    if (event.colorSecundary === 'primary') {
      event.color = 'medium';
    } else {
      event.color = 'primary'
    }
  }

  async sendNotification(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  doRefresh(event) {
    if (this.tab_active === 'book') {
      this.BookService.getAll().subscribe(book => {
        if (book.length < this.books.length) {
          const books_comparateds = book.every(function (value, index) { return value === this.books[index] });
          if (!books_comparateds) this.books = book.map(b => { return b; });
        };
      });
    } else if (this.tab_active === 'coffee') {
      this.CoffeeService.getAllcoffe().subscribe(coffees => {
        if (this.coffees.length < coffees.length) {
          const coffes_comparateds = coffees.sort().every(function (value, index) { return value === this.coffees.sort()[index] });
          if (!coffes_comparateds) this.coffees = coffees.map(coffees => { return coffees; });
        }
      });
    }
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ngAfterViewInit() {
    this.stopLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Cargando',
      cssClass: 'custom-class custom-loading',
      duration: 1000
    });

    return await loading.present();
  }

  async stopLoading() {
    return await this.loadingController.dismiss();
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

  setab(tab: string) {
    this.tab_active = tab;
  };

  //favoritos 
  async removeFavorite(id) {
    if (this.hasFavorite(id)) {
      let user = this.currentUser.usuario;
      this.FavoriteService.removeFavorite(id, user).subscribe(data => {
        if (data) {
          this.sendNotification("El ilbro " + data + " se ha eliminado con exito");
        }
      });
    }
  };

  async addFavorite(id) {
    // create an alert instance
    
    if (this.hasFavorite(id)) {
      let user = this.currentUser.usuario;
      
      this.FavoriteService.addFavorite(id, user).subscribe(data => {
        if (data) {
          this.sendNotification("El ilbro " + data + " se ha añadido con exito");
        }
      });
    }
  }

  hasFavorite(id) {
    let favorite = false;
    console.log(id);
    this.books.forEach(item => {
      if (item.isbn === id) {
        favorite = item.favorite === 1 ? false : true;
      }
    });
    return favorite;
  }

  clickEventHandler(event) {
    if (!event.favorite) {
      this.addFavorite(event.isbn);
      event.favorite = true;
    } else {
      this.removeFavorite(event.isbn);
      event.favorite = false;
    }
  }

  //conleciones 

  async listcollections(event) {
    const modal = await this.modalCtrl.create({
      component: CollectionsListComponent,
      componentProps: { 'isbn': event.isbn }
    });
    await modal.present();

    await modal.onWillDismiss();
    if(!event.collection) event.collection = true;
    else event.collection = false;
  }

  clickEventHandlerSave(event) {
    this.listcollections(event);
  }
}
