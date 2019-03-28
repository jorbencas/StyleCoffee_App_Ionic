import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardListRoutingModule } from './card-list-routing.module';
import { CardListComponent } from './card-list.component';

@NgModule({
  declarations: [CardListComponent],
  imports: [
    CommonModule,
    IonicModule,
    CardListRoutingModule
  ]
})
export class CardListModule { }
