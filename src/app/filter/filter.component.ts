import { Component, AfterViewInit, Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Filter } from '../core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements AfterViewInit {

  tracks: {name: string, value: string}[] = [];
  tags1 = ["Novela Negra", " Novela Contemporania", "Drama", "Romance", "Acción", "Thriller", "Comedia", 
  " Novela Juvenil", "Infantil", "Libros de Auto ayuda"]
  tags2 = ["Capuchino", "Bombón" , "Descafeinado", "Cortado", "Café solo", "Cafe con leche", "Expreso Doble",
  "Café Jamaicano", "Làgrima", "Instantaneo"]

  constructor(
    public modalCtrl: ModalController
  ) { }
  slidesOpts = {};
  colorSecundary = 'medium';
    ngOnInit() {
      this.slidesOpts = {
          slidesPerView: 3,
          slidesPerColumn: 1,
          spaceBetween: 0,
          centeredSlides: false,
      }
    }

  @Input() filter: Filter;
  // TODO use the ionViewDidEnter event
  ngAfterViewInit() {
    console.log(this.filter);
    // passed in array of track names that should be excluded (unchecked)
    if(this.filter.filter_books){
      this.tags1.forEach(element => {
        this.tracks.push({"name":element, "value":element.toLowerCase().replace(" ", "") });
      });
    }
    if(this.filter.filter_coffee){ 
      this.tags2.forEach(element => {
        this.tracks.push({"name":element, "value":element.toLowerCase().replace(" ", "") });
      });
    }
  }

  clickEventHandlerSave(event) {
    if (event.colorSecundary === 'primary') {
      event.color = 'medium';
    } else {
      event.color = 'primary'
    }

  }

}
