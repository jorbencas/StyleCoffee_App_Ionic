import { Component, AfterViewInit, ViewEncapsulation  } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent  implements AfterViewInit {

  tracks: {name: string, value: string}[] = [];
  tags1 = ["Novela Negra", " Novela Contemporania", "Drama", "Romance", "Acción", "Thriller", "Comedia", 
  " Novela Juvenil", "Infantil", "Libros de Auto ayuda"]
  tags2 = ["Capuchino", "Bombón" , "Descafeinado", "Cortado", "Café solo", "Cafe con leche", "Expreso Doble",
  "Café Jamaicano", "Làgrima", "Instantaneo"]

  constructor(
    public modalCtrl: ModalController
  ) { }

  // TODO use the ionViewDidEnter event
  ngAfterViewInit() {
    // passed in array of track names that should be excluded (unchecked)
    this.tags1.forEach(element => {
      console.log(element);
      this.tracks.push({"name":element, "value":element.toLowerCase().replace(" ", "") });
    });
    this.tags2.forEach(element => {
      this.tracks.push({"name":element, "value":element.toLowerCase().replace(" ", "") });
    });
  }

}
