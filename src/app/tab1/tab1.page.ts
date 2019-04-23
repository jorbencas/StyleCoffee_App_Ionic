import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonInfiniteScroll, LoadingController, ModalController } from '@ionic/angular';
import { CoffeeService, User, UserService, BookService, FavoriteService } from '../core';

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
    private FavoriteService: FavoriteService
  ) { }

  infos = [];
  authcolor = 'default';
  color = 'default';
  colorSecundary = 'default';
  visible = false;
  authenticated = false;
  currentUser: User;
  tab_active = 'book';
  coffees = [];
  contentavaible = false;

  ngOnInit(): void {

    this.presentLoading();

    this.route.params.subscribe(param => {
      let genere = param['genere'];
      let kind = param['kind'];

      if (genere) {
        this.BookService.getBookbyGenere(genere).subscribe(book => {
          this.infos.push(book);
        });
      } else if (kind) {
        this.CoffeeService.getByKind(kind).subscribe(coffee => {
          this.coffees.push(coffee);
        });
      } else {
        this.BookService.getAll().subscribe(books => {
          books.forEach(element => {
            this.infos.push(element);
          });
         
        });
        this.CoffeeService.getAllcoffe().subscribe(coffees => {
          coffees.forEach(element => {
            this.coffees.push(element);
          });
        });
      }

    });

  }

  ionViewWillEnter() {
    this.cangetdata();
    this.cangetauth();
  }

  doRefresh(event) {
    if (this.tab_active === 'book') {
      this.BookService.getAll().subscribe(book => {
        if (book == this.infos) this.infos.push(book);
      });
    } else if (this.tab_active === 'coffee') {
      this.CoffeeService.getAllcoffe().subscribe(coffees => {
        if (this.coffees == coffees) this.coffees.push(coffees);
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

  cangetdata() {
    if (this.tab_active === 'book' && this.infos.length > 0) {
      this.infos.forEach(item => {
        if (item.favorite == 1) this.color = 'danger';
      });
      this.contentavaible = true;
    } else if (this.tab_active === 'coffee' && this.coffees.length > 0) {
      this.infos.forEach(item => {
        if (item.favorite == 1) {
          this.colorSecundary = 'dark';
        }
      });
      this.contentavaible = true;
    }
  }

  cangetauth() {
    if (!this.authenticated) {
      this.userService.currentUser.subscribe(
        (userData) => {
          this.currentUser = userData;
          if (this.currentUser.usuario !== undefined) {
            this.authenticated = true;
            this.authcolor = 'dark';
          }
        }
      );
    }
  }

  setab(tab: string) {
    this.tab_active = tab;
    this.cangetdata();
  };

  async removeFavorite(id) {
    if (this.hasFavorite(id)) {
      const alert = await this.alertCtrl.create({
        header: 'Favorite removed',
        buttons: [{
          text: 'OK'
        }]
      });

      let user = this.currentUser.usuario;
      this.FavoriteService.removeFavorite(id, user).subscribe(data =>{
        if(data){
           // now present the alert on top of all other content
          alert.present();
        }
      });
    }
  };

  async addFavorite(id) {
    // create an alert instance
    if (this.hasFavorite(id)) {
      const alert = await this.alertCtrl.create({
        header: 'Favorite Added',
        buttons: [{
          text: 'OK'
        }]
      });

      let user = this.currentUser.usuario;
      this.FavoriteService.addFavorite(id, user).subscribe(data =>{
        if(data){
           // now present the alert on top of all other content
          alert.present();
        }
      });
    }

  }

  hasFavorite(id) {
    let favorite = false;

    this.infos.forEach(item => {
      if (item.isbn === id) {
        if (item.favorite === 1) favorite = false;
        else favorite = true;
      }
    });
    return favorite;
  }



  clickEventHandler(event) {
    if (event.color === 'default') {
      this.color = 'danger';
      event.color = this.color;
      this.addFavorite(event.id);
    } else {
      this.color = 'default';
      event.color = this.color;
      this.removeFavorite(event.id);
    }
  }

  async listcollections() {
    const header =  `<ion-icon ios="add" md="add"></ion-icon>Add your info`
    const alert = await this.alertCtrl.create({
      header: 'Coleciones',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Checkbox 1',
          value: 'value1',
          checked: true
        },

        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Checkbox 2',
          value: 'value2'
        },

        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Checkbox 3',
          value: 'value3'
        },

        {
          name: 'checkbox4',
          type: 'checkbox',
          label: 'Checkbox 4',
          value: 'value4'
        },

        {
          name: 'checkbox5',
          type: 'checkbox',
          label: 'Checkbox 5',
          value: 'value5'
        },

        {
          name: 'checkbox6',
          type: 'checkbox',
          label: 'Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6 Checkbox 6',
          value: 'value6'
        }
      ],
      buttons: [
        {
          text: 'Nueva',
          cssClass: 'secondary',
          handler: () => {
            this.addcollection();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
          }
        }, 
        {
          text: 'Guarda',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  async addcollection() {
    const alert = await this.alertCtrl.create({
      header: 'Añade la colección',
      inputs: [
        {
          name: 'collection',
          placeholder:'Añade la nueva colección',
          type: 'text',
          value: ''
        }],
      buttons: [{
        text: 'Añade',
        handler: () => {
          this.listcollections();
        }
      }]
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  clickEventHandlerSave(event) {
    if (event.colorSecundary === 'dark') {
      this.listcollections();
      this.colorSecundary = 'default';
      event.colorSecundary = this.colorSecundary;
    } else {
      this.colorSecundary = 'dark';
      event.colorSecundary = this.colorSecundary;
    }

  }



  /*   loadData(event) {
      setTimeout(() => {
        console.log('Done');
        event.target.complete();
  
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.infos.length == 50 || this.coffees.length == 50) {
          event.target.disabled = true;
        }
      }, 500);
    }
  
    toggleInfiniteScroll() {
      this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    } */

}
