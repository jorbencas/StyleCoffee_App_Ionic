import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReserveRoutingModule } from './reserve-routing.module';
import { ReserveComponent } from './reserve.component';
import { SharedModule } from '../shared';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReserveRoutingModule,
    SharedModule
  ],
  declarations: [ReserveComponent]
})
export class ReserveModule { }
