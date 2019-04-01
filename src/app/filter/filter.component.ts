import { Component, AfterViewInit, ViewEncapsulation  } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent  implements AfterViewInit {

  tracks: {name: string, isChecked: boolean}[] = [];

  constructor(
    public modalCtrl: ModalController
  ) { }

  // TODO use the ionViewDidEnter event
  ngAfterViewInit() {
    // passed in array of track names that should be excluded (unchecked)
    
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.tracks.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    const excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }

}
