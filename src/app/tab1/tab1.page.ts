import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { CoffeeService, User, UserService, BookService, FavoriteService, Filter } from '../core';
import { CollectionsListComponent } from '../collections-list/collections-list.component';
import { ToastController } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
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
    public toastCtrl: ToastController
  ) { }

  filter: Filter = {
    titulo: '',
    filter_books:[],
    filter_coffee: []
  };
 
  books = [];
  colorSecundary = 'default';
  search = false;
  queryText = '';
  authenticated = false;
  currentUser: User;
  tab_active = 'book';
  coffees = [];
 
  contentavaible = false;
  books_original = [];
  coffees_original = [];
  num = 0;
  ngOnInit(): void {

  /*   this.filter = this.books.map( e => {return e;});
    this.filter.filter_coffee = this.coffees.map( e => {return e;}); */
    this.presentLoading();

    this.route.params.subscribe(param => {
      let genere = param['genere'];
      let kind = param['kind'];

      if (genere) {
        this.BookService.getBookbyGenere(genere).subscribe(books => {
          this.books = books.map((book) => { return book; });
          if (this.books.length >= 0) {
            this.sendNotification("Todo cargado con exito");
          }
        });
      } else if (kind) {
        this.CoffeeService.getByKind(kind).subscribe(coffees => {
          this.coffees = coffees.map((coffee) => { return coffee; });
          if (this.coffees.length >= 0) {
            this.sendNotification("Todo cargado con exito");
          }
        });
      } else {
        this.BookService.getAll().subscribe(books => {
          this.books_original = books.map(eleem => { return eleem });
          this.books = books.map((book) => { return book; });
        });
        this.CoffeeService.getAllcoffe().subscribe(coffees => {
          this.coffees_original = coffees.map(eleem => { return eleem });
          this.coffees = coffees.map((coffee) => { return coffee; });
        });
        if (this.coffees.length >= 0 || this.books.length >= 0) {
          this.sendNotification("Todos los libros y cafees se han cargado con exito");
        }
      }
    });
  }

  ionViewWillEnter() {
    this.cangetauth();
  }

  onfilter(filter){
    /* if(filter == 'book' && this.tab_active == 'book') this.filter = { this.book,'book'};
    else if (filter == 'coffee' && this.tab_active == 'coffee')  this.filter.titulo = 'coffee'; */
  }
  cansearch() {
    this.search = this.search ? false : true;
  }

  updateSchedule() {
    if (this.tab_active == 'book') {
      const filtrados = this.books.filter(b => b.titulo.toLowerCase().includes(this.queryText));
      this.books = filtrados.map(book => book);

      /*  this.BookService.getBookbyName(this.queryText).subscribe(result =>{
         if(result.length > 0){
           this.books = result.map( (elem) => {return elem});
         }else{
           //this.books = [];
           console.log(this.books.length);
         }
         
       }); */
    }
    else {
      const filtradas = this.coffees.filter(c => c.name.toLowerCase().includes(this.queryText));
      this.coffees = filtradas.map((elem) => { return elem; });

      /* this.CoffeeService.getByKind(this.queryText).subscribe(result =>{
        if(result.length > 0){
          this.coffees = result.map( (elem) => {return elem;});
        }else{
         //this.coffees = [];
         console.log(this.coffees.length);
        }
      }); */

    }
  }

  ngAfterContentChecked() {
    if (this.search && this.queryText == '') {
      if (this.tab_active === 'book') {
        if (this.books_original.length > this.books.length) {
          this.books = this.books_original.map(b =>  b).sort();
        };
      } else if (this.tab_active === 'coffee') {
        if (this.coffees.length > this.coffees_original.length) {
          this.coffees = this.coffees_original.map(coffees => coffees).sort();
        }
      }
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
          if(!books_comparateds) this.books = book.map(b => { return b; });
        };
      });
    } else if (this.tab_active === 'coffee') {
      this.CoffeeService.getAllcoffe().subscribe(coffees => {
        if (this.coffees.length < coffees.length) {
          const coffes_comparateds = coffees.sort().every(function (value, index) { return value === this.coffees.sort()[index] });
          if(!coffes_comparateds) this.coffees = coffees.map(coffees => { return coffees; });
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

    this.books.forEach(item => {
      if (item.isbn === id) {
        favorite = item.favorite === 1 ? false : true;
      }
    });
    return favorite;
  }

  clickEventHandler(event) {
    if (event.color === 'default') {
      this.addFavorite(event.id);
      event.color = 'danger';
    } else {
      this.removeFavorite(event.id);
      event.color = 'default';
    }
  }

  async listcollections(id) {
    const modal = await this.modalCtrl.create({
      component: CollectionsListComponent
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {

    }
  }


  clickEventHandlerSave(event) {
    if (event.colorSecundary === 'default') {
      this.listcollections(event.id);
      this.colorSecundary = 'dark';
      event.colorSecundary = this.colorSecundary;
    } else {
      this.colorSecundary = 'default';
      event.colorSecundary = this.colorSecundary;
    }
  }



  /*   loadData(event) {
      setTimeout(() => {
        console.log('Done');
        event.target.complete();
  
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.books.length == 50 || this.coffees.length == 50) {
          event.target.disabled = true;
        }
      }, 500);
    }
  
    toggleInfiniteScroll() {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    } */

}
