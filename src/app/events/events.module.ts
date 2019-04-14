import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class EventsModule { }
