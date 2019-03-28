import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReserveListRoutingModule } from './reserve-list-routing.module';
import { ReserveListComponent } from './reserve-list.component';

@NgModule({
  declarations: [ReserveListComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReserveListRoutingModule
  ]
})
export class ReserveListModule { }
