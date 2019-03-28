import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReserveRoutingModule } from './reserve-routing.module';
import { ReserveComponent } from './reserve.component';

@NgModule({
  declarations: [ReserveComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReserveRoutingModule
  ]
})
export class ReserveModule { }
