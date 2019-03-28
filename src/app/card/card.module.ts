import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardRountingModule } from './card-rounting.module';
import { CardComponent } from './card.component';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    IonicModule,
    CardRountingModule
  ]
})
export class CardModule { }
